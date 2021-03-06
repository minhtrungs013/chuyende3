import React, { useState, useEffect, Fragment } from "react";
import * as apiaxios from "../../../api/service";
import dayjs from "dayjs";
import "./style.css";
import Swal from "sweetalert2";
export default function Internships(props) {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    apiaxios.batchAPI("internshipcourse").then((res) => {
      setPosts(res.data.data);
    });
  }, []);
  const [values, setValues] = useState({
    idInternshipCourse: "",
    nameCoure: "",
    dateStart: "",
    dateEnd: "",
    kindOfInternship: "",
    status: "",
  });
  const [valuesId, setValuesId] = useState(null);
  const handleEditFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...values };
    newFormData[fieldName] = fieldValue;
    setValues(newFormData);
  };
  const handleEditClick = (products) => {
    setValuesId(products.idInternshipCourse);
    const formValues = {
      idInternshipCourse: products.idInternshipCourse,
      nameCoure: products.nameCoure,
      dateStart: products.dateStart,
      dateEnd: products.dateEnd,
      kindOfInternship: products.kindOfInternship,
      status: products.status,
    };
    setValues(formValues);
  };
  const modals = document.getElementById("myModalBatch");
  const editSubmit = (event) => {
    event.preventDefault();
    const editBatch = {
      idInternshipCourse: values.idInternshipCourse,
      nameCoure: values.nameCoure,
      dateStart: values.dateStart,
      dateEnd: values.dateEnd,
      kindOfInternship: values.kindOfInternship,
      status: values.status,
    };
    apiaxios
      .batchPut(`internshipcourse/${valuesId}`, editBatch)
      .then((res) => {
        const newBatch = [...posts];
        const index = posts.findIndex(
          (products) => products.idInternshipCourse === valuesId
        );
        newBatch[index] = editBatch;
        setPosts(newBatch);
        handleCloseModal();
      })
      .catch((error) => {
        if (error.response) {
          Swal.fire({
            icon: "error",
            text: error.response.data.error,
            confirmButtonText: "X??c nh???n",
          });
        } else if (error.request) {
          Swal.fire({
            icon: "error",
            text: error.request,
            confirmButtonText: "X??c nh???n",
          });
        } else {
          console.log("Error", error.message);
          Swal.fire({
            icon: "error",
            text: error.message,
            confirmButtonText: "X??c nh???n",
          });
        }
      });
  };
  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleDeleteClick = (postsId) => {
    Swal.fire({
      title: "B???n c?? mu???n x??a kh??a th???c t???p n??y ?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: "#3085d6",
      cancelButtonText: "H???y",
      confirmButtonText: "?????ng ??",
    }).then((result) => {
      if (result.isConfirmed) {
        const newContacts = [...posts];
        const index = posts.findIndex(
          (products) => products.idInternshipCourse === postsId
        );
        apiaxios
          .deleteBatch(`internshipcourse/${postsId}`, "DELETE", newContacts)
          .then((res) => {});
        newContacts.splice(index, 1);
        setPosts(newContacts);
      }
    });
  };
  return (
    <div>
      <form>
        <div>
          <h3>KH??A TH???C T???P</h3>
          <div className="grid wide home-candidate">
            <div className="row home-candidate--list">
              <span className="col l-2-8-batch">Kh??a th???c t???p</span>
              <span className="col l-2-8-batch ">Ng??y b???t ?????u</span>
              <span className="col l-2-8-batch ">Ng??y k???t th??c</span>
              <span className="col l-2-8-batch ">Lo???i th???c t???p</span>
              <span className="col l-2-8-batch ">Tr???ng th??i</span>
              <span className="col l-2-8-TV ">T??c v???</span>
            </div>
            <div className="table-body-internships">
              {posts.map((products) => (
                <ul className="row sm-gutter sm-gutter--list">
                  <li name="nameCoure" className="col l-2-8-batch ">
                    <a>{products.nameCoure}</a>
                  </li>
                  <li
                    element="li"
                    name="dateStart"
                    className="col l-2-8-dateStart "
                  >
                    {dayjs(products.dateStart).format("DD/MM/YYYY")}
                  </li>
                  <li
                    element="li"
                    name="dateEnd"
                    className="col l-2-8-dateEnd "
                  >
                    {dayjs(products.dateEnd).format("DD/MM/YYYY")}
                  </li>
                  <li
                    name="kindOfInternship"
                    className="col l-2-8-kindOfInternship "
                  >
                    {products.kindOfInternship}
                  </li>
                  <li name="status" className="col l-2-8-status ">
                    {products.status}
                  </li>
                  <li className="col l-2-8-TacVu ">
                    <i
                      className="fa fa-trash-o"
                      style={{ marginLeft: "10px" }}
                      aria-hidden="true"
                      onClick={() =>
                        handleDeleteClick(products.idInternshipCourse)
                      }
                    ></i>
                    <i
                      data-target="#myModalBatch"
                      data-toggle="modal"
                      style={{ marginLeft: "10px" }}
                      className="fa fa-pencil-square-o"
                      aria-hidden="true"
                      onClick={() => {
                        handleEditClick(products);
                        handleOpenModal();
                      }}
                    ></i>
                  </li>
                  <form>
                    <div className="container">
                      {open && (
                        <div
                          className="modal fade"
                          id="myModalBatch"
                          tabIndex={-1}
                          role="dialog"
                          aria-labelledby="exampleModalCenterTitle"
                          aria-hidden="true"
                        >
                          <div
                            className="modal-dialog modal-lg"
                            role="document"
                            style={{ width: "700px", marginTop: "100px" }}
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h4 id="exampleModalLongTitle">
                                  S???A KH??A TH???C T???P
                                </h4>
                                <button
                                  type="button"
                                  className="close"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <span aria-hidden="true">??</span>
                                </button>
                              </div>
                              <div className="modal-body">
                                <tr>
                                  <td>
                                    <label>Kh??a th???c t???p :</label>
                                  </td>
                                  <td>
                                    <input
                                      disabled
                                      className="input-editBatch"
                                      style={{width:"200px",height:"30px"}}
                                      type="text"
                                      name="nameCoure"
                                      value={values.nameCoure}
                                      onChange={handleEditFormChange}
                                    />
                                  </td>
                                  <td style={{ paddingLeft: "20px" }}>
                                    <label>Lo???i th???c t???p : </label>
                                  </td>
                                  <td>
                                    <select
                                      className="input-editBatch"
                                      style={{width:"200px",height:"30px"}}
                                      name="status"
                                      id="cars"
                                      value={values.status}
                                      onChange={handleEditFormChange}
                                    >
                                      <option disabled selected hidden>
                                        Ch???n...
                                      </option>
                                      <option value="Done">Done</option>
                                      <option value="In progress">
                                        In progress
                                      </option>
                                      <option value="N/A">N/A</option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>Ng??y b???t ?????u : </label>
                                  </td>
                                  <td>
                                    <input
                                      className="input-editBatch"
                                      style={{width:"200px",height:"30px"}}
                                      type="date"
                                      name="dateStart"
                                      value={dayjs(values.dateStart).format(
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={handleEditFormChange}
                                    ></input>
                                  </td>
                                  <td>
                                    <label>Tr???ng th??i : </label>
                                  </td>
                                  <td>
                                    <select
                                      className="input-editBatch"
                                      style={{width:"200px",height:"30px"}}
                                      name="kindOfInternship"
                                      id="cars"
                                      value={values.kindOfInternship}
                                      onChange={handleEditFormChange}
                                    >
                                      <option disabled selected hidden>
                                        Ch???n...
                                      </option>
                                      <option value="Full time">
                                        Full time
                                      </option>
                                      <option value="Part time">
                                        Part time
                                      </option>
                                    </select>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <label>Ng??y k???t th??c: </label>
                                  </td>
                                  <td>
                                    <input
                                      className="input-editBatch"
                                      style={{width:"200px",height:"30px"}}
                                      type="date"
                                      name="dateEnd"
                                      value={dayjs(values.dateEnd).format(
                                        "YYYY-MM-DD"
                                      )}
                                      onChange={handleEditFormChange}
                                    ></input>
                                  </td>
                                </tr>

                                <div className="modal-footer">
                                  <button
                                    type="button"
                                    className="btn btn-secondary btn-Batch-Cancel"
                                    data-dismiss="modal"
                                  >
                                    H???y
                                  </button>
                                  <button
                                    className="btn btn-primary btn-Batch"
                                    type="submit"
                                    onClick={editSubmit}
                                  >
                                    C???p nh???t
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </ul>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
