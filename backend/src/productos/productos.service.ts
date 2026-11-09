import { ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto.js';
import { UpdateProductoDto } from './dto/update-producto.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity.js';
import { ILike, Not, QueryFailedError, Repository } from 'typeorm';
import { PaginacionDto } from './dto/paginacion.dto.js';
import { merge } from 'rxjs';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepo : Repository<Producto> 
  ){}

  async create(dto: CreateProductoDto):Promise<Producto> {
    const producto = this.productoRepo.create(dto);
    return this.guardar(producto);

  }

  async findAll({pagina, limite, buscar}: PaginacionDto) {
    const[datos, total]= await this.productoRepo.findAndCount({
      where: buscar ? {nombre: ILike('%$(buscar)%')}:{},
      skip: (pagina-1)*limite,
      take: limite
    })
    return {datos, total, pagina, limite, paginas:Math.ceil(total/limite)};
  }

  async findOne(id: number):Promise<Producto> {
    const producto = await this.productoRepo.findOneBy({id});
    if(!producto){
      throw new NotFoundException('No existe el producto co ne id ${id}')
    }
    return producto;
  }

  async update(id: number, dto: UpdateProductoDto): Promise<Producto> {
    const producto = await this.findOne(id);
    this.productoRepo.merge(producto, dto);
    return this.guardar(producto);

  }

  async remove(id: number):Promise<void> {
    const producto = await this.findOne(id);
    await this.productoRepo.remove(producto);
  }
  private async guardar (producto:Producto):Promise<Producto>{
    try{
      return await this.productoRepo.save(producto);
    }catch(error){
      if(
        error instanceof QueryFailedError &&
        (error.driverError as {code?: string}).code === '23505'
      ){
        throw new ConflictException(
        'Elproduto ya existe ${producto.nombre}'
        );
      }
      throw error;
    }
  }
}
