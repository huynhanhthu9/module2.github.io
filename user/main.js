// Giả sử bạn đã import hoặc copy dữ liệu users và posts từ 2 file users.js và posts.js
// Ví dụ:
// const users = [...]; // từ user.js
// const posts = [...]; // từ posts.js

const readline = require('readline-sync');

// LOGIN
function login() {
  const email = readline.question('Email: ');
  const password = readline.question('Password: ', { hideEchoBack: true });

  if (!email || !password) {
    console.log('Hãy nhập đầy đủ thông tin');
    return;
  }

  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    console.log(`Xin chào ${user.first_name} ${user.last_name}`);
  } else {
    console.log('Thông tin tài khoản không chính xác');
  }
}

// REGISTER
function register() {
  const first_name = readline.question('First name: ');
  const last_name = readline.question('Last name: ');
  const email = readline.question('Email: ');
  const password = readline.question('Password: ', { hideEchoBack: true });

  if (!first_name || !last_name || !email || !password) {
    console.log('Hãy nhập đầy đủ thông tin');
    return;
  }

  const exists = users.find(u => u.email === email);
  if (exists) {
    console.log('Email này đã có tài khoản');
    return;
  }

  const newId = Math.max(...users.map(u => u.id)) + 1;
  users.push({ id: newId, first_name, last_name, email, password });
  console.log('Đăng ký thành công!');
}

// LIST USERS
function listUsers() {
  const keyword = readline.question('Nhập từ khóa (để trống để xem tất cả): ').toLowerCase();

  const filtered = keyword
    ? users.filter(u =>
        `${u.first_name} ${u.last_name}`.toLowerCase().includes(keyword) || u.email.toLowerCase().includes(keyword)
      )
    : users;

  filtered.forEach(u => {
    console.log(`ID: ${u.id}, Tên: ${u.first_name} ${u.last_name}, Email: ${u.email}`);
  });
}

// LIST POSTS
function listPosts() {
  posts.forEach(post => {
    const user = users.find(u => u.id === post.user_id);
    const authorName = user ? `${user.first_name} ${user.last_name}` : 'Unknown';
    console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}, Người tạo: ${authorName}`);
  });
}

// VIEW POST BY ID
function viewPostDetail() {
  const id = readline.questionInt('Nhập ID bài viết: ');
  const post = posts.find(p => p.id === id);

  if (!post) {
    console.log('Không tìm thấy bài viết');
    return;
  }

  const user = users.find(u => u.id === post.user_id);
  const authorName = user ? `${user.first_name} ${user.last_name}` : 'Unknown';

  console.log(`ID: ${post.id}`);
  console.log(`Tiêu đề: ${post.title}`);
  console.log(`Nội dung: ${post.content}`);
  console.log(`Ảnh: ${post.image}`);
  console.log(`Người tạo: ${authorName}`);
  console.log(`Ngày tạo: ${post.created_at}`);
  console.log(`Ngày cập nhật: ${post.updated_at}`);
}

// SEARCH POSTS BY USER
function searchPostsByUser() {
  const email = readline.question('Nhập email người dùng: ');
  const user = users.find(u => u.email === email);

  if (!user) {
    console.log('Không tìm thấy người dùng');
    return;
  }

  const userPosts = posts.filter(p => p.user_id === user.id);
  if (userPosts.length === 0) {
    console.log('Người dùng này chưa có bài viết nào.');
  } else {
    userPosts.forEach(post => {
      console.log(`ID: ${post.id}, Title: ${post.title}, Ngày tạo: ${post.created_at}`);
    });
  }
}

// MENU
function mainMenu() {
  while (true) {
    console.log('\n===== MENU =====');
    console.log('1. Đăng nhập');
    console.log('2. Đăng ký');
    console.log('3. Xem danh sách người dùng');
    console.log('4. Xem danh sách bài viết');
    console.log('5. Xem chi tiết bài viết');
    console.log('6. Tìm bài viết theo email người dùng');
    console.log('0. Thoát');

    const choice = readline.questionInt('Chọn chức năng: ');
    switch (choice) {
      case 1: login(); break;
      case 2: register(); break;
      case 3: listUsers(); break;
      case 4: listPosts(); break;
      case 5: viewPostDetail(); break;
      case 6: searchPostsByUser(); break;
      case 0: return;
      default: console.log('Lựa chọn không hợp lệ');
    }
  }
}

// Chạy chương trình
mainMenu();
