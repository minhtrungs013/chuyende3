import React, { useState, useEffect } from "react";
import * as apiaxios from "../../api/service";
import "./styleStudent.css";
import Swal from "sweetalert2";
export default function AddStudent() {
  const [posts, setPosts] = useState([]);
  const idBatch = localStorage.getItem("idBatch");

  useEffect(() => {
    apiaxios.student(`internship/batch/${idBatch}`).then((res) => {
      setPosts(res.data.data);
    });
  }, []);
  const handleCancelFormSubmit = () => {
    setAddFormData({});
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
    Array.from(document.querySelectorAll("select")).forEach(
      (select) => (select.value = "Chọn...")
    );
  };
  const closeModal = () => {
    const modals = document.getElementById("exampleModalStudent");
    modals.style.display = "none";
  };
  const [addFormData, setAddFormData] = useState({
    idInternship: "",
    fullNameInternship: "",
    address: "",
    university: "",
    email: "",
    mentor: "",
    telInternship: "",
    internshipProject: "",
    securityTest: "",
    toeicScore: "",
    status: "",
    remark: "",
    pcType: "",
    covidVaccinationiInformation: "",
    certificationDate: "",
    idInternshipCourse: idBatch,
  });
  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  };
  const tai_lai_trang = (event) => {
    window.location.reload();
  };
  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    const newContact = {
      idInternship: addFormData.idInternship,
      fullNameInternship: addFormData.fullNameInternship,
      address: addFormData.address,
      university: addFormData.university,
      email: addFormData.email,
      mentor: addFormData.mentor,
      telInternship: addFormData.telInternship,
      internshipProject: addFormData.internshipProject,
      securityTest: addFormData.securityTest,
      toeicScore: addFormData.toeicScore,
      testDate: addFormData.testDate,
      status: addFormData.status,
      remark: addFormData.remark,
      pcType: addFormData.pcType,
      covidVaccinationiInformation: addFormData.covidVaccinationiInformation,
      certificationDate: addFormData.certificationDate,
      idInternshipCourse: addFormData.idInternshipCourse,
    };
    apiaxios
      .studentCreate(`internship?idInternshipCourse=${idBatch}`, newContact)
      .then((res) => {
        const newBatch = [newContact, ...posts];
        setPosts(newBatch);
        closeModal();
        handleCancelFormSubmit();
        tai_lai_trang();
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "Xác nhận",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "Xác nhận",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "Xác nhận",
          });
        }
      });
  };
  return (
    <div
      className="modal fade"
      id="exampleModalStudent"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalStudent"
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-lg"
        role="document"
        style={{ width: "700px", marginTop: "5px" }}
      >
        <div
          className="modal-content"
          style={{ marginTop: "10px", width: "770px" }}
        >
          <div className="modal-header">
            <h4 id="exampleModalStudent">THÊM THỰC TẬP SINH</h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <tr>
                <td>
                  <label>Họ tên:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="fullNameInternship"
                    onChange={handleAddFormChange}
                  />
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Địa chỉ: </label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="address"
                    onChange={handleAddFormChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Trạng thái: </label>
                </td>
                <td>
                  <select
                    style={{ height: "30px", width: "200px" }}
                    className="input-TT"
                    name="status"
                    id="cars"
                    onChange={handleAddFormChange}
                  >
                    <option disabled selected hidden>
                      Chọn...
                    </option>
                    <option value="Đang thực tập">Đang thực tập</option>
                    <option value="Dừng thực tập">Dừng thực tập</option>
                  </select>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Trường đại học: </label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="university"
                    onChange={handleAddFormChange}
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Email:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="email"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Số điện thoại:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="telInternship"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Dự án thực tập:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="internshipProject"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Thời gian thực tập:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="date"
                    name="testDate"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Điểm bảo mật:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="securityTest"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Điểm Toeic:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="toeicScore"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Bình luận:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="remark"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Loại PC:</label>
                </td>
                <td>
                  <select
                    className="inputText"
                    type="text"
                    name="pcType"
                    onChange={handleAddFormChange}
                  >
                    <option disabled selected hidden>
                      Chọn...
                    </option>
                    <option value="PC">PC</option>
                    <option value="Laptop">Laptop</option>
                  </select>
                  <br></br>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Ngày chứng nhận:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    style={{ width: "200px" }}
                    type="date"
                    name="certificationDate"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
                <td style={{ paddingLeft: "20px" }}>
                  <label>Thông tin covid:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    type="text"
                    name="covidVaccinationiInformation"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
              </tr>
              <tr>
                <td>
                  <label>Người hướng dẫn:</label>
                </td>
                <td>
                  <input
                    className="inputText"
                    style={{ width: "200px" }}
                    type="text"
                    name="mentor"
                    onChange={handleAddFormChange}
                  ></input>
                  <br></br>
                </td>
              </tr>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-Batch-Cancel"
                  data-dismiss="modal"
                  onClick={handleCancelFormSubmit}
                >
                  Hủy
                </button>
                <button
                  onClick={handleAddFormSubmit}
                  type="submit"
                  className="btn btn-danger-del btn-add"
                >
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
