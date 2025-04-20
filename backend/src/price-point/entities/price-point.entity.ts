import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class PricePoint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}
