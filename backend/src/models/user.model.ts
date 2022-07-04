import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class User {
  constructor() {
    this.id = 0;
    this.first_name = "";
    this.last_name = "";
    this.email = "";
    this.password = "";
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

}

export { User }