import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
