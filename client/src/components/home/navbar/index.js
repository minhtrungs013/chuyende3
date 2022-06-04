import React from "react";
import { Link } from "react-router-dom";
import { authActions } from "../../../redux/login/index";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

export default function Navbar() {
  const id = useSelector((state) => state.auth.id);

  const isLogin = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    Swal.fire({
      title: "Bạn có muốn đăng xuất ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(authActions.logout());
      }
    });
  };

  return (
    <div class="wrap">
      <nav>
        <ul class="primary">
          <li>
            <Link class="nav-color" to="/mentor">
              Quản lý Mentor
            </Link>
            <ul class="sub"></ul>
          </li>
          <li>
            <Link class="nav-color" to="/candidate">
              Quản lý ứng viên
            </Link>
            <ul class="sub">
              <Link class="nav-color" to="/interview">
                Kết quả phỏng vấn
              </Link>
            </ul>
          </li>
          <li>
            <Link class="nav-color" to="/student">
              Quản lý sinh viên
            </Link>
            <ul class="sub"></ul>
          </li>
          <li>
            <Link class="nav-color" to="/internshipcourse">
              Quản lý khóa thực tập
            </Link>
            <ul class="sub">
              <Link class="nav-color" to="/dg">
                Quản lý nhóm
              </Link>
            </ul>
          </li>
          <li>
            <a
              class="nav-color"
              href=""
              data-toggle="modal"
              onClick={() => {
                Swal.fire({
                  title: "Chức năng này sẽ được hỗ trợ sau",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              }}
            >
              Đánh giá thực tập
            </a>
            <ul class="sub">
              <li>
                <a
                  class="nav-color"
                  href=""
                  data-toggle="modal"
                  onClick={() => {
                    Swal.fire({
                      title: "Chức năng này sẽ được hỗ trợ sau",
                      showClass: {
                        popup: "animate__animated animate__fadeInDown",
                      },
                      hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                      },
                    });
                  }}
                >
                  Báo cáo
                </a>
              </li>
              <li>
                <a
                  class="nav-color"
                  href=""
                  data-toggle="modal"
                  onClick={() => {
                    Swal.fire({
                      title: "Chức năng này sẽ được hỗ trợ sau",
                      showClass: {
                        popup: "animate__animated animate__fadeInDown",
                      },
                      hideClass: {
                        popup: "animate__animated animate__fadeOutUp",
                      },
                    });
                  }}
                >
                  Cấu hình
                </a>
              </li>
            </ul>
          </li>
          <li className="float--right">
            <a class="nav-color" onClick={logoutHandler}>
              Đăng xuất
            </a>
            <ul class="sub"></ul>
          </li>
          <li className="float--right">
           
            <p class="nav-color1">
             {id}
            </p>
            <ul class="sub"></ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
