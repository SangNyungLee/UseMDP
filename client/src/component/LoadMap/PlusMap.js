import styled from "styled-components";
import plus from "../../constant/img/plus_icon.png";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import base64Str from "../../constant/ImageBase64";

const PlusDiv = styled.div`
  width: 200px;
  height: 200px;
`;
const PlusImg = styled.img`
  width: 150px;
  height: 150px;
`;

export default function PlusMap(props) {
  const [editedCreator, setEditedCreator] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPlannerAccess, setEditedPlannerAccess] = useState("PUBLIC");

  const handleSaveChanges = async () => {
    console.log(editedCreator, editedTitle, editedPlannerAccess);

    // axios로 planner를 생성하자.
    const data = {
      creator: editedCreator,
      title: editedTitle,
      thumbnail: base64Str,
      plannerAccess: editedPlannerAccess,
    };

    try {
      const result = await axios.post(
        "http://localhost:8080/api/postPlanner",
        data,
        { withCredentials: true }
      );

      // SweetAlert을 이용하여 성공 메시지를 보여줌
      Swal.fire({
        icon: "success",
        title: "플래너 생성 성공!",
        text: "플래너가 성공적으로 생성되었습니다.",
      });
    } catch (error) {
      // SweetAlert을 이용하여 에러 메시지를 보여줌
      Swal.fire({
        icon: "error",
        title: "플래너 생성 실패",
        text: "플래너 생성 중에 오류가 발생했습니다.",
      });
    }
  };

  const handleClick = async (e) => {
    // SweetAlert을 이용하여 입력 폼을 보여줌
    e.stopPropagation();
    const result = await Swal.fire({
      title: "플래너 생성",
      html:
        '<input id="swal-input1" class="swal2-input" placeholder="제목">' +
        '<input id="swal-input2" class="swal2-input" placeholder="작성자">',
      input: "radio",
      inputOptions: {
        PUBLIC: "Public",
        PRIVATE: "Private",
      },
      inputValidator: (value) => {
        if (!value) {
          return "공개범위를 선택하세요.";
        }
      },
      confirmButtonText: "확인",
      showCancelButton: true,
    });

    if (result.isConfirmed) {
      // 입력값을 가져와서 상태 업데이트
      const titleInput = Swal.getPopup().querySelector("#swal-input1").value;
      const creatorInput = Swal.getPopup().querySelector("#swal-input2").value;
      const plannerAccessInput = result.value;

      setEditedTitle(titleInput);
      setEditedCreator(creatorInput);
      setEditedPlannerAccess(plannerAccessInput);

      // 확인 버튼 클릭 시 플래너 생성 함수 호출
      handleSaveChanges();
    }
  };

  return (
    <PlusDiv onClick={ e => handleClick(e) }>
      <PlusImg src={plus}></PlusImg>
    </PlusDiv>
  );
}
