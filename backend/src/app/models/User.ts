import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm'
import bcrypt from 'bcryptjs'
@Entity('users')
class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;
    
    @Column()
    name: string;
   
    @Column()
    username: string;

    @Column()
    password: string;
   

    @Column()
    city: string;
    

    @Column()
    uf: string;
    
    @Column()    
    age: string;



    @BeforeInsert()
    @BeforeUpdate()
    hashPassword(){
        this.password = bcrypt.hashSync(this.password, 8)
    }
}

export default User;