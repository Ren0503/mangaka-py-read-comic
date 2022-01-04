# Mangaka

![mangaka](https://github.com/Ren0503/mangaka-py-read-comic/blob/master/client/src/assets/header.png)

> MangaKa là trang web đọc truyện trực tiếp miễn phí, được xây dựng bằng Django và React.
- **server**: Chứa API cho trang web được tạo bằng Python, Django và SQLite (có thể chuyển thành MySQL)
- **client** trang giao diện, được tạo với React, Redux Thunk và Bootstrap.

## Tính năng

1. Đăng nhập/đăng ký
2. Cập nhật lại thông tin tài khoản
3. Xem tất cả truyện
4. Tìm kiếm truyện
5. Đọc truyện trực tuyến
6. Tìm kiếm theo tác giả, thể loại
7. Đánh giá truyện
8. Tìm kiếm nâng cao
9. Yêu thích, lưu danh sách yêu thích

### Server

| Plugin | README |
| ------ | ------ |
| django | [plugins/django/README.md](https://github.com/django/django/blob/main/README.rstb/master/README.md) |
| django-cors-headers | [plugins/django-cors-headers/README.md](https://github.com/adamchainz/django-cors-headers) |
| django-storages | [plugins/django-storages/README.md](https://github.com/jschneier/django-storages/blob/master/README.rst)|
| djangorestframework | [plugins/djangorestframework/README.md](https://github.com/encode/django-rest-framework/blob/master/README.md) |
| djangorestframework-simplejwt | [plugins/djangorestframework-simplejwt/README.md](https://github.com/jazzband/djangorestframework-simplejwt/blob/master/README.rst) |
| mysqlclient | [plugins/mysqlclient/README.md](https://github.com/psycopg/psycopg2) |
| Pillow | [plugins/Pillow/README.md](https://github.com/python-pillow/Pillow/blob/main/README.mdmd) |
| sqlparse | [plugins/sqlparse/README.md](https://github.com/andialbrecht/sqlparse/blob/master/README.rst) |


### Client

| Plugin | README |
| ------ | ------ |
| axios | [plugins/axios/README.md](https://github.com/axios/axios/blob/master/README.md) |
| react | [plugins/react/README.md](https://github.com/facebook/react/blob/master/README.md) |
| react-bootstrap | [plugins/react-bootstrap/README.md](https://github.com/react-bootstrap/react-bootstrap/blob/master/README.md) |
| react-redux | [plugins/react-redux/README.md](https://github.com/reduxjs/react-redux) |
| react-router-dom | [plugins/react-router/README.md](https://github.com/ReactTraining/react-router/blob/master/README.md) |
| react-slick | [plugins/react-slick/README.md](https://github.com/akiran/react-slick) |
| redux | [plugins/redux/README.md](https://github.com/reduxjs/redux)|
| redux-thunk | [plugins/redux-thunk/README.md](https://github.com/reduxjs/redux-thunk/blob/master/README.md) |

## Core Structure
    code
      ├── package.json
      │
      ├── client
      │   ├── public
      │   ├── src
      │   │   ├── actions
      │   │   ├── assets
      │   │   ├── components
      │   │   ├── error
      │   │   ├── hooks
      │   │   ├── reducers
      │   │   ├── routes
      │   │   ├── screens
      │   │   ├── styles
      │   │   ├── types
      │   │   ├── App.tsx
      │   │   ├── store.ts
      │   │   └── index.ts
      │   │
      │   └── package.json
      │
      ├── server 
      │   ├── chapter
      │   ├── genres
      │   ├── manga
      │   ├── server
      │   ├── static
      │   ├── users
      │   ├── .gitignore
      │   ├── db.sqlite3
      │   ├── manage.py
      │   └── requirements.txt
      ├── .gitignore
      └── README.md