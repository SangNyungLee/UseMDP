import Swal from 'sweetalert2';
import { GoogleLoginButton, GithubLoginButton } from 'react-social-login-buttons';

export const logoutModal = () => {
    Swal.fire({
        icon: 'success',
        title: '성공!',
        text: '로그아웃에 성공하셨습니다.!!',
    });
};

export const loginFail = (where) => {
    Swal.fire({
        icon: 'error',
        title: `${where} 로그인 실패...`,
        text: '뭔가 잘못된거 같습니다!!!!',
    });
};

export const loginSuccess = (where) => {
    Swal.fire({
        icon: 'success',
        title: '성공!',
        text: `${where} 로그인 성공`,
    });
};

export const nyanCat = () => {
    Swal.fire({
        title: '안녕하세요.',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/dancingpepe.gif")
          left top
          no-repeat
        `,
    });
};

export const loginCheckFail = (request) => {
    Swal.fire({
        icon: 'error',
        title: `${request} 요청 실패...`,
        text: '로그인이 되어있지 않아 요청이 거부되었습니다',
    });
};

export const cookieFail = (request) => {
    Swal.fire({
        icon: 'error',
        title: `${request} 요청 실패...`,
        text: '쿠키가 만료되어 요청이 거부되었습니다',
    });
};

export const requestFail = (request, text = '') => {
    Swal.fire({
        icon: 'error',
        title: `${request} 요청 실패...`,
        text,
    });
};

export const setTagRequest = (request) => {
    Swal.fire({
        icon: 'error',
        title: `${request} 요청 실패...`,
        text: '로그인이 되어있지 않아 요청이 거부되었습니다',
    });
};

export const requestDeleteSucess = () => {
    Swal.fire({
        icon: 'success',
        title: '성공!',
        text: `플래너 삭제 완료`,
    });
};

function formatDateString(dateString) {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short',
    };
  
    const formattedDate = new Date(dateString).toLocaleString('ko-KR', options);
    return formattedDate;
  }

export const jsonDataReadSucess = async (originalData) => {
    const { title, creator, plannerAccess, updatedAt} = originalData;
    const formattedDate = formatDateString(updatedAt);
    const { value: newData } = await Swal.fire({
        title: '대상혁',
        html:`
        <div class="swal-content">
            <div class="swal-item">
                <label>제목:</label>
                <input id="title" class="swal2-input" placeholder="제목" value="${title}">
            </div>
            <div class="swal-item">
                <label>작성자:</label>
                <input id="creator" class="swal2-input" placeholder="작성자" value="${creator}">
            </div>
            <br/>
            <div class="swal-item">
                <div class="checkbox-group">
                    <input type="checkbox" id="plannerAccess" class="swal2-checkbox" ${plannerAccess === 'PUBLIC' ? 'checked' : ''}>
                    <label for="plannerAccess">공개</label>
                    <input type="checkbox" id="plannerAccessPrivate" class="swal2-checkbox" ${plannerAccess === 'PRIVATE' ? 'checked' : ''}>
                    <label for="plannerAccessPrivate">비공개</label>
                </div>
            </div>
            <br/>
            <div class="swal-item">
                <label>마지막 수정일:</label>
                <div id="formattedDate">${formattedDate}</div>
            </div>
        </div>
      `,
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const isPublic = document.getElementById('plannerAccess').checked;
            return {
                title: document.getElementById('title').value,
                creator: document.getElementById('creator').value,
                plannerAccess: isPublic ? 'PUBLIC' : 'PRIVATE',
            };
        },
      });
    
      if (newData) {
        Swal.fire({
          title: 'Data Updated!',
          icon: 'success',
        });
        const { title, creator, plannerAccess } = newData;
        return {
            ...originalData,
            title,
            creator,
            plannerAccess,
        };
      } else {
        Swal.fire({
          title: 'Edit Canceled',
          icon: 'info',
        });
        return null;
      }
}
