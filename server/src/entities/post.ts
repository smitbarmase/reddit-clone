import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Field, ObjectType } from "type-graphql";

import { User } from "./user";
import { Comment } from "./comment";
import { VotePost } from "./vote-post";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  text: string;

  @Field()
  voteStatus: number; // 1 or -1 or 0

  @Field()
  commentCount: number;

  @Field()
  @Column({ default: 0 })
  voteCount: number;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
  user: User;

  @Field(() => [VotePost])
  @OneToMany(() => VotePost, (vote) => vote.post)
  votes: VotePost[];

  @Field(() => [Comment])
  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
