import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from './services/users.service';
import { PostsService } from './services/posts.service';
import { CommentsService } from './services/comments.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  users: any[] = [];
  posts: any[] = [];
  comments: any[] = [];
  selectedUser: any = null;
  selectedPost: any = null;

  usersForm = new FormGroup({
    selectedUser: new FormControl(null),
    selectedPost: new FormControl(null),
  });

  constructor(private userService: UsersService, private postService: PostsService, private commentsService: CommentsService) {}

  fetchComments(postID: number) {
    this.commentsService.fetchComments(postID).subscribe(
      (response) => {
        this.comments = response;
        console.log("Successfully fetched comments")
      },
      (error) => console.error('Error fetching comments:', error)
    );
  }

  updateSelectedUser(userId: number) {
    this.selectedUser = this.users.find((user) => parseInt(user.id) === Number(userId));
    this.fetchPosts(userId);
  }

  fetchUsers() {
    this.userService.fetchUsers().subscribe(
      (response) => {
        this.users = response;
        if (this.users.length > 0) {
          const firstUserId = this.users[0].id;
          this.usersForm.patchValue({ selectedUser: firstUserId });
          this.updateSelectedUser(firstUserId);
          console.log("Successfully fetched users")
          return;
        }
        console.log("Errro fetched users")
      },
      (error) => console.error('Error fetching users:', error)
    );
  }

  fetchPosts(userId: number) {
    this.postService.fetchPosts(userId).subscribe(
      (response) => {
        this.posts = response;
        if (this.posts.length) {
          const firstPostId = this.posts[0].id;
          this.usersForm.patchValue({ selectedPost: firstPostId });
          setTimeout(() => this.updateSelectedPost(firstPostId), 0);
          return
        }
        console.log("Successfully fetched posts")
      },
      (error) => console.error('Error fetching posts:', error)
    );
  }

  updateSelectedPost(postId: number) {
    this.selectedPost = this.posts.find((post) => parseInt(post.id) === Number(postId)) || null;
    if (this.selectedPost) {
      this.fetchComments(postId);
      return
    }
  }

  ngOnInit() {
    this.fetchUsers();
    this.usersForm.get('selectedUser')?.valueChanges.subscribe((userId) => {
      if (userId) {
        this.updateSelectedUser(userId);
        return
      }
    });

    this.usersForm.get('selectedPost')?.valueChanges.subscribe((postId) => {
      if (postId) {
        this.updateSelectedPost(postId);
        return
      }
    });
  }
}
