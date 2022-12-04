import axios from "axios";

import {
  STUDENT_ADD_DATA,
  STUDENT_DELETE_DATA,
  STUDENT_GET_DATA,
  STUDENT_QUERY_GET_DATA,
  STUDENT_SEARCH_GET_DATA,
  STUDENT_TEST_UPDATE_DATA,
  TEST_ADD_DATA,
  TEST_DELETE_DATA,
  TEST_GET_DATA,
} from "./Action";

export const getStudentData = (skip) => (dispatch) => {

  if(skip==undefined)
  {
    skip=0
  }
  console.log("skip in action",skip)
  axios
    .get(`https://easy-blue-stingray-tutu.cyclic.app/student/studentdata/${5}/${skip}`)
    .then((r) => {
        console.log("get data",r)   
      dispatch({ type: STUDENT_GET_DATA, payload: r.data });
    });
};

export const addStudentData = (data) => () => {
  axios
    .post(`https://easy-blue-stingray-tutu.cyclic.app/auth/signup`, data)
    .then((r) => {
      //   console.log("Add data for perticular student", r);
      return STUDENT_ADD_DATA;
    })
    .catch((err) => {
      return "user_exist";
    });
};

export const deleteStudentData = (id) => (dispatch) => {
  axios
    .delete(`https://easy-blue-stingray-tutu.cyclic.app/student/delete/${id}`)
    .then((r) => {
      console.log("Delete data of perticular student", r);
      dispatch({ type: STUDENT_DELETE_DATA });
      return STUDENT_DELETE_DATA;
    });
};

export const getTestData = (id) => (dispatch) => {
  axios
    .get(`https://easy-blue-stingray-tutu.cyclic.app/student/user/${id}`)
    .then((r) => {
      console.log(r);
      dispatch({ type: TEST_GET_DATA, payload: r.data.FindStudent });
    });
}

export const addTestData = (data, id) => (dispatch) => {
  axios
    .post(`https://easy-blue-stingray-tutu.cyclic.app/student/create/${id}`, data)
    .then((r) => {
      console.log(r);
      dispatch({ type: TEST_ADD_DATA, payload: r.data });
    });
};

export const deleteTestData = (id) => (dispatch) => {
  axios
    .delete(`https://easy-blue-stingray-tutu.cyclic.app/student/delete/test/${id}`)
    .then((r) => {
      console.log("deleted test", r);
      return TEST_DELETE_DATA;
    });
};

export const SearchTitle = (title) => (dispatch) => {
  axios
    .get(`https://easy-blue-stingray-tutu.cyclic.app/student/searchtitle/${title}`)
    .then((r) => {
      console.log(r.data)
     dispatch({ type: STUDENT_SEARCH_GET_DATA, payload:r.data });
    });
};


export const query = (fileerBy, sortby) => (dispatch) => {
  if (fileerBy.length > 0 || sortby.length > 0) {

    axios
      .get(`https://easy-blue-stingray-tutu.cyclic.app/student/query/${fileerBy},${sortby}`)
      .then((r) => {
        console.log("sort response", r)
        dispatch({ type: STUDENT_QUERY_GET_DATA, payload: r.data });
      })
  } else {
    dispatch(getStudentData());
  }

}

const token=localStorage.getItem("token")

export const getTestDataforStudent = () => (dispatch) => {
  axios
    .get(`https://easy-blue-stingray-tutu.cyclic.app/student`,{
      headers: {
        Authorization: token,
      },
    })
    .then((r) => {
      console.log("Test for students",r);
      dispatch({ type: TEST_GET_DATA, payload: r.data });
    });
}


export const  updateTestData= (id,data) => (dispatch) => {
  axios
    .patch(`https://easy-blue-stingray-tutu.cyclic.app/student/edittestcompletion/${id}`,data)
    .then((r) => {
      console.log("Updated response for test",r)
    });
}
