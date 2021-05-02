import { CreateDateColumn, ObjectID, ObjectIdColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export abstract class BasicEntity {
  
    @PrimaryGeneratedColumn({name: '_id' })
    @ObjectIdColumn()
    id: ObjectID;
  
     /**
     * DB insert time.
     */
    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" , update: false})
    public createdAt: Date;

    /**
     * DB last update time.
     */
    @UpdateDateColumn({ type: "timestamp" })
    public updatedAt: Date;
  }