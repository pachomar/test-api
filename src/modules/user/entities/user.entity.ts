import { Entity, Column } from 'typeorm';
import { EntityBase } from '../../../common/models/entity.model';
import { compareSync } from 'bcrypt';

@Entity()
export class User extends EntityBase {
  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true })
  changePasswordToken: string;

  @Column({ nullable: true })
  notificationToken: string;

  async validatePassword(password: string): Promise<boolean> {
    const user = this as User;
    return compareSync(password, user.password);
  }
}
