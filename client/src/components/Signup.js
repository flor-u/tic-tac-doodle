import React, { Component } from 'react'
// import PageTitle from '../../fontStyles/PageTitle'
import AuthService from '../services/AuthService'
// import { Card, CardTitle, Form } from '../../styles/card';

export default class Access extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: ''
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history, setUser } = this.props;
    this.authService.signup(this.state)
    .then(
      (user) => {
        setUser(user);
        history.push("/select")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  handleUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append('image', e.target.files[0])
    this.authService.upload(uploadData)
    .then(
      (data) => {
        this.setState({...this.state, image: data.secure_url})
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password} = this.state;
    return (
      <div className="full">
        <div className='flex center'>
        <div className="login-svg">
        <svg width="230" viewBox="0 0 186 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.532 30.576C12.444 30.576 10.404 30.348 8.41198 29.892C6.44398 29.412 4.82398 28.776 3.55198 27.984L6.28798 21.792C7.48798 22.488 8.83198 23.052 10.32 23.484C11.808 23.892 13.236 24.096 14.604 24.096C15.78 24.096 16.62 23.988 17.124 23.772C17.628 23.532 17.88 23.184 17.88 22.728C17.88 22.2 17.544 21.804 16.872 21.54C16.224 21.276 15.144 20.988 13.632 20.676C11.688 20.268 10.068 19.836 8.77198 19.38C7.47598 18.9 6.34798 18.132 5.38798 17.076C4.42798 15.996 3.94798 14.544 3.94798 12.72C3.94798 11.136 4.39198 9.696 5.27998 8.4C6.16798 7.104 7.48798 6.084 9.23998 5.34C11.016 4.596 13.164 4.224 15.684 4.224C17.412 4.224 19.104 4.416 20.76 4.8C22.44 5.16 23.916 5.7 25.188 6.42L22.632 12.576C20.16 11.328 17.82 10.704 15.612 10.704C13.428 10.704 12.336 11.232 12.336 12.288C12.336 12.792 12.66 13.176 13.308 13.44C13.956 13.68 15.024 13.944 16.512 14.232C18.432 14.592 20.052 15.012 21.372 15.492C22.692 15.948 23.832 16.704 24.792 17.76C25.776 18.816 26.268 20.256 26.268 22.08C26.268 23.664 25.824 25.104 24.936 26.4C24.048 27.672 22.716 28.692 20.94 29.46C19.188 30.204 17.052 30.576 14.532 30.576ZM35.9961 4.8H44.4921V30H35.9961V4.8ZM72.4501 16.716H79.8301V27.372C78.3421 28.404 76.6141 29.196 74.6461 29.748C72.6781 30.3 70.7461 30.576 68.8501 30.576C66.1621 30.576 63.7501 30.024 61.6141 28.92C59.4781 27.792 57.7981 26.232 56.5741 24.24C55.3741 22.224 54.7741 19.944 54.7741 17.4C54.7741 14.856 55.3741 12.588 56.5741 10.596C57.7981 8.58 59.4901 7.02 61.6501 5.916C63.8341 4.788 66.2941 4.224 69.0301 4.224C71.5021 4.224 73.7101 4.644 75.6541 5.484C77.6221 6.3 79.2541 7.5 80.5501 9.084L75.1141 13.872C73.5301 12.024 71.6461 11.1 69.4621 11.1C67.5901 11.1 66.1021 11.664 64.9981 12.792C63.8941 13.92 63.3421 15.456 63.3421 17.4C63.3421 19.296 63.8821 20.82 64.9621 21.972C66.0661 23.124 67.5301 23.7 69.3541 23.7C70.4341 23.7 71.4661 23.496 72.4501 23.088V16.716ZM115.49 4.8V30H108.506L98.9301 18.552V30H90.6501V4.8H97.6341L107.21 16.248V4.8H115.49ZM138.844 30.576C134.98 30.576 131.968 29.532 129.808 27.444C127.648 25.356 126.568 22.428 126.568 18.66V4.8H135.064V18.408C135.064 20.256 135.388 21.6 136.036 22.44C136.708 23.28 137.668 23.7 138.916 23.7C140.164 23.7 141.112 23.28 141.76 22.44C142.432 21.6 142.768 20.256 142.768 18.408V4.8H151.12V18.66C151.12 22.428 150.04 25.356 147.88 27.444C145.72 29.532 142.708 30.576 138.844 30.576ZM174.346 4.8C176.674 4.8 178.702 5.184 180.43 5.952C182.158 6.72 183.49 7.824 184.426 9.264C185.362 10.704 185.83 12.384 185.83 14.304C185.83 16.224 185.362 17.904 184.426 19.344C183.49 20.784 182.158 21.888 180.43 22.656C178.702 23.424 176.674 23.808 174.346 23.808H170.71V30H162.214V4.8H174.346ZM173.806 17.256C174.958 17.256 175.822 17.004 176.398 16.5C176.974 15.972 177.262 15.24 177.262 14.304C177.262 13.368 176.974 12.648 176.398 12.144C175.822 11.616 174.958 11.352 173.806 11.352H170.71V17.256H173.806Z" fill="#FDED01"/>
<path d="M6.41198 26.892L6.17503 27.8635L6.18192 27.8652L6.18884 27.8668L6.41198 26.892ZM1.55198 24.984L0.637298 24.5798L0.286393 25.374L1.02343 25.8329L1.55198 24.984ZM4.28798 18.792L4.7897 17.927L3.82434 17.3671L3.3733 18.3878L4.28798 18.792ZM8.31998 20.484L8.04117 21.4443L8.04835 21.4464L8.05555 21.4484L8.31998 20.484ZM15.124 20.772L15.5179 21.6911L15.5361 21.6834L15.5539 21.6749L15.124 20.772ZM14.872 18.54L14.4947 19.4662L14.5063 19.4708L14.872 18.54ZM11.632 17.676L11.4266 18.6547L11.4299 18.6554L11.632 17.676ZM6.77198 16.38L6.42467 17.3177L6.43235 17.3206L6.44008 17.3233L6.77198 16.38ZM3.38798 14.076L2.64053 14.7404L2.64804 14.7487L3.38798 14.076ZM3.27998 5.4L4.10492 5.96523L4.10492 5.96523L3.27998 5.4ZM7.23998 2.34L6.8536 1.41765L6.84911 1.41955L7.23998 2.34ZM18.76 1.8L18.5341 2.77415L18.5423 2.77604L18.5505 2.7778L18.76 1.8ZM23.188 3.42L24.1115 3.80346L24.451 2.98584L23.6806 2.54974L23.188 3.42ZM20.632 9.576L20.1813 10.4687L21.1426 10.954L21.5555 9.95946L20.632 9.576ZM11.308 10.44L10.9307 11.3661L10.9456 11.3722L10.9607 11.3777L11.308 10.44ZM14.512 11.232L14.322 12.2138L14.3277 12.2149L14.512 11.232ZM19.372 12.492L19.0302 13.4318L19.0378 13.4346L19.0455 13.4372L19.372 12.492ZM22.792 14.76L22.052 15.4327L22.0604 15.4417L22.792 14.76ZM22.936 23.4L23.756 23.9724L23.7609 23.9652L22.936 23.4ZM18.94 26.46L19.3309 27.3805L19.3369 27.3779L18.94 26.46ZM12.532 26.576C10.5174 26.576 8.55235 26.3561 6.63513 25.9172L6.18884 27.8668C8.25562 28.3399 10.3705 28.576 12.532 28.576V26.576ZM6.64894 25.9205C4.75025 25.4574 3.23705 24.8552 2.08054 24.1351L1.02343 25.8329C2.41092 26.6968 4.13772 27.3666 6.17503 27.8635L6.64894 25.9205ZM2.46667 25.3882L5.20267 19.1962L3.3733 18.3878L0.637298 24.5798L2.46667 25.3882ZM3.78627 19.657C5.06405 20.3981 6.48422 20.9923 8.04117 21.4443L8.59879 19.5237C7.17975 19.1117 5.91192 18.5779 4.7897 17.927L3.78627 19.657ZM8.05555 21.4484C9.6189 21.8771 11.1361 22.096 12.604 22.096V20.096C11.3359 20.096 9.99707 19.9069 8.58442 19.5196L8.05555 21.4484ZM12.604 22.096C13.7956 22.096 14.8132 21.9932 15.5179 21.6911L14.7301 19.8529C14.4268 19.9828 13.7644 20.096 12.604 20.096V22.096ZM15.5539 21.6749C15.9132 21.5038 16.2517 21.2617 16.5009 20.9175C16.7583 20.5621 16.88 20.1529 16.88 19.728H14.88C14.88 19.7489 14.8773 19.7546 14.8785 19.7507C14.8799 19.7461 14.882 19.7431 14.881 19.7445C14.8783 19.7483 14.8388 19.8002 14.6941 19.8691L15.5539 21.6749ZM16.88 19.728C16.88 19.2313 16.7146 18.77 16.3905 18.388C16.0821 18.0246 15.6705 17.7793 15.2376 17.6092L14.5063 19.4708C14.7454 19.5647 14.8378 19.6494 14.8655 19.682C14.8719 19.6895 14.8749 19.6943 14.876 19.6962C14.8766 19.6972 14.8769 19.6978 14.877 19.6981C14.8771 19.6983 14.8772 19.6984 14.8772 19.6985C14.8772 19.6986 14.8773 19.6989 14.8775 19.6996C14.8777 19.7002 14.878 19.7015 14.8783 19.7035C14.879 19.7073 14.88 19.7152 14.88 19.728H16.88ZM15.2493 17.6139C14.5098 17.3126 13.3521 17.0099 11.8341 16.6966L11.4299 18.6554C12.9359 18.9661 13.9381 19.2394 14.4947 19.4661L15.2493 17.6139ZM11.8374 16.6973C9.91917 16.2947 8.3448 15.8733 7.10389 15.4367L6.44008 17.3233C7.79117 17.7987 9.4568 18.2413 11.4266 18.6547L11.8374 16.6973ZM7.1193 15.4423C5.97851 15.0197 4.98381 14.3448 4.12792 13.4033L2.64804 14.7487C3.71216 15.9192 4.97345 16.7803 6.42467 17.3177L7.1193 15.4423ZM4.13539 13.4116C3.37742 12.5589 2.94798 11.3655 2.94798 9.72H0.947984C0.947984 11.7225 1.47855 13.4331 2.64058 14.7404L4.13539 13.4116ZM2.94798 9.72C2.94798 8.33598 3.33196 7.09333 4.10492 5.96523L2.45505 4.83477C1.45201 6.29867 0.947984 7.93602 0.947984 9.72H2.94798ZM4.10492 5.96523C4.86419 4.8571 6.01704 3.94576 7.63086 3.26044L6.84911 1.41955C4.95893 2.22223 3.47178 3.3509 2.45505 4.83477L4.10492 5.96523ZM7.62637 3.26234C9.24855 2.58277 11.2577 2.224 13.684 2.224V0.223999C11.0703 0.223999 8.78342 0.609224 6.8536 1.41766L7.62637 3.26234ZM13.684 2.224C15.3372 2.224 16.9534 2.40761 18.5341 2.77415L18.9859 0.825845C17.2546 0.424388 15.4868 0.223999 13.684 0.223999V2.224ZM18.5505 2.7778C20.1481 3.12016 21.5257 3.62814 22.6954 4.29026L23.6806 2.54974C22.3063 1.77185 20.7318 1.19983 18.9695 0.822196L18.5505 2.7778ZM22.2644 3.03653L19.7084 9.19253L21.5555 9.95946L24.1115 3.80346L22.2644 3.03653ZM21.0827 8.68331C18.5056 7.38227 16.0113 6.704 13.612 6.704V8.704C15.6287 8.704 17.8144 9.27373 20.1813 10.4687L21.0827 8.68331ZM13.612 6.704C12.4714 6.704 11.4704 6.83674 10.7197 7.19972C10.3307 7.38777 9.97474 7.65415 9.71742 8.02741C9.45462 8.40861 9.33598 8.84199 9.33598 9.288H11.336C11.336 9.20601 11.3538 9.17739 11.364 9.16259C11.3797 9.13985 11.4332 9.07623 11.5903 9.00028C11.9316 8.83526 12.5686 8.704 13.612 8.704V6.704ZM9.33598 9.288C9.33598 9.77523 9.49996 10.2258 9.81469 10.5989C10.1139 10.9535 10.5124 11.1957 10.9307 11.3661L11.6853 9.51391C11.4555 9.42031 11.3681 9.33854 11.3433 9.30913C11.3331 9.29709 11.334 9.29475 11.3362 9.30074C11.3383 9.30668 11.336 9.30489 11.336 9.288H9.33598ZM10.9607 11.3777C11.691 11.6483 12.8281 11.9246 14.322 12.2138L14.702 10.2502C13.2198 9.96335 12.2209 9.71174 11.6553 9.50225L10.9607 11.3777ZM14.3277 12.2149C16.2132 12.5684 17.7769 12.976 19.0302 13.4318L19.7137 11.5522C18.3271 11.048 16.6508 10.6156 14.6963 10.2491L14.3277 12.2149ZM19.0455 13.4372C20.2034 13.8372 21.2023 14.4979 22.052 15.4327L23.5319 14.0873C22.4617 12.9101 21.1806 12.0588 19.6985 11.5468L19.0455 13.4372ZM22.0604 15.4417C22.8297 16.2674 23.268 17.4395 23.268 19.08H25.268C25.268 17.0725 24.7222 15.3646 23.5236 14.0783L22.0604 15.4417ZM23.268 19.08C23.268 20.464 22.884 21.7067 22.1111 22.8348L23.7609 23.9652C24.764 22.5013 25.268 20.864 25.268 19.08H23.268ZM22.116 22.8276C21.3577 23.9139 20.1906 24.8297 18.5431 25.5421L19.3369 27.3779C21.2413 26.5543 22.7383 25.4301 23.7559 23.9724L22.116 22.8276ZM18.5491 25.5396C16.9538 26.217 14.9589 26.576 12.532 26.576V28.576C15.145 28.576 17.4222 28.191 19.3309 27.3804L18.5491 25.5396ZM33.9961 1.8V0.799998H32.9961V1.8H33.9961ZM42.4921 1.8H43.4921V0.799998H42.4921V1.8ZM42.4921 27V28H43.4921V27H42.4921ZM33.9961 27H32.9961V28H33.9961V27ZM33.9961 2.8H42.4921V0.799998H33.9961V2.8ZM41.4921 1.8V27H43.4921V1.8H41.4921ZM42.4921 26H33.9961V28H42.4921V26ZM34.9961 27V1.8H32.9961V27H34.9961ZM70.4501 13.716V12.716H69.4501V13.716H70.4501ZM77.8301 13.716H78.8301V12.716H77.8301V13.716ZM77.8301 24.372L78.4 25.1937L78.8301 24.8954V24.372H77.8301ZM59.6141 25.92L59.1471 26.8043L59.1549 26.8084L59.6141 25.92ZM54.5741 21.24L53.7147 21.7515L53.7221 21.7635L54.5741 21.24ZM54.5741 7.596L53.7193 7.07702L53.7175 7.07999L54.5741 7.596ZM59.6501 2.916L60.1052 3.80644L60.109 3.80449L59.6501 2.916ZM73.6541 2.484L73.2574 3.40197L73.2642 3.4049L73.2711 3.40774L73.6541 2.484ZM78.5501 6.084L79.211 6.83442L79.9346 6.19707L79.324 5.45076L78.5501 6.084ZM73.1141 10.872L72.3548 11.5228L73.0144 12.2923L73.775 11.6224L73.1141 10.872ZM62.9981 9.792L63.7127 10.4915L63.7127 10.4915L62.9981 9.792ZM62.9621 18.972L62.2325 19.656L62.2401 19.6639L62.9621 18.972ZM70.4501 20.088L70.8331 21.0117L71.4501 20.7559V20.088H70.4501ZM70.4501 14.716H77.8301V12.716H70.4501V14.716ZM76.8301 13.716V24.372H78.8301V13.716H76.8301ZM77.2602 23.5503C75.8745 24.5113 74.2505 25.2594 72.376 25.7852L72.9161 27.7108C74.9776 27.1326 76.8096 26.2967 78.4 25.1937L77.2602 23.5503ZM72.376 25.7852C70.4891 26.3144 68.648 26.576 66.8501 26.576V28.576C68.8442 28.576 70.8671 28.2856 72.9161 27.7108L72.376 25.7852ZM66.8501 26.576C64.3028 26.576 62.0512 26.054 60.0732 25.0316L59.1549 26.8084C61.4489 27.994 64.0214 28.576 66.8501 28.576V26.576ZM60.081 25.0357C58.0979 23.9884 56.5531 22.5507 55.4261 20.7165L53.7221 21.7635C55.043 23.9133 56.8583 25.5956 59.1471 26.8043L60.081 25.0357ZM55.4334 20.7285C54.3332 18.8802 53.7741 16.7797 53.7741 14.4H51.7741C51.7741 17.1083 52.415 19.5678 53.7148 21.7515L55.4334 20.7285ZM53.7741 14.4C53.7741 12.0202 54.3332 9.9338 55.4307 8.11201L53.7175 7.07999C52.415 9.2422 51.7741 11.6918 51.7741 14.4H53.7741ZM55.4289 8.11498C56.5538 6.26214 58.1053 4.82859 60.1052 3.80643L59.195 2.02556C56.8748 3.21141 55.0424 4.89785 53.7193 7.07702L55.4289 8.11498ZM60.109 3.80449C62.1357 2.75773 64.4354 2.224 67.0301 2.224V0.223999C64.1527 0.223999 61.5325 0.818268 59.1912 2.02751L60.109 3.80449ZM67.0301 2.224C69.3882 2.224 71.4578 2.62437 73.2574 3.40197L74.0507 1.56603C71.9623 0.663628 69.6159 0.223999 67.0301 0.223999V2.224ZM73.2711 3.40774C75.0933 4.16329 76.5888 5.26612 77.7761 6.71724L79.324 5.45076C77.9193 3.73388 76.1509 2.43671 74.0371 1.56026L73.2711 3.40774ZM77.8891 5.33358L72.4531 10.1216L73.775 11.6224L79.211 6.83442L77.8891 5.33358ZM73.8733 10.2212C72.1238 8.18004 69.9735 7.1 67.4621 7.1V9.1C69.3186 9.1 70.9364 9.86795 72.3548 11.5228L73.8733 10.2212ZM67.4621 7.1C65.3751 7.1 63.6102 7.73693 62.2834 9.09254L63.7127 10.4915C64.594 9.59107 65.8051 9.1 67.4621 9.1V7.1ZM62.2834 9.09254C60.9561 10.4487 60.3421 12.2586 60.3421 14.4H62.3421C62.3421 12.6534 62.832 11.3913 63.7127 10.4915L62.2834 9.09254ZM60.3421 14.4C60.3421 16.496 60.945 18.2826 62.2325 19.6559L63.6916 18.2881C62.8191 17.3574 62.3421 16.096 62.3421 14.4H60.3421ZM62.2401 19.6639C63.5603 21.0415 65.3002 21.7 67.3541 21.7V19.7C65.76 19.7 64.5718 19.2065 63.6841 18.2801L62.2401 19.6639ZM67.3541 21.7C68.5636 21.7 69.726 21.4708 70.8331 21.0117L70.0671 19.1643C69.2062 19.5212 68.3045 19.7 67.3541 19.7V21.7ZM71.4501 20.088V13.716H69.4501V20.088H71.4501ZM113.49 1.8H114.49V0.799998H113.49V1.8ZM113.49 27V28H114.49V27H113.49ZM106.506 27L105.739 27.6416L106.039 28H106.506V27ZM96.9301 15.552L97.6971 14.9104L95.9301 12.7979V15.552H96.9301ZM96.9301 27V28H97.9301V27H96.9301ZM88.6501 27H87.6501V28H88.6501V27ZM88.6501 1.8V0.799998H87.6501V1.8H88.6501ZM95.6341 1.8L96.4011 1.15839L96.1013 0.799998H95.6341V1.8ZM105.21 13.248L104.443 13.8896L106.21 16.0021V13.248H105.21ZM105.21 1.8V0.799998H104.21V1.8H105.21ZM112.49 1.8V27H114.49V1.8H112.49ZM113.49 26H106.506V28H113.49V26ZM107.273 26.3584L97.6971 14.9104L96.163 16.1936L105.739 27.6416L107.273 26.3584ZM95.9301 15.552V27H97.9301V15.552H95.9301ZM96.9301 26H88.6501V28H96.9301V26ZM89.6501 27V1.8H87.6501V27H89.6501ZM88.6501 2.8H95.6341V0.799998H88.6501V2.8ZM94.867 2.44161L104.443 13.8896L105.977 12.6064L96.4011 1.15839L94.867 2.44161ZM106.21 13.248V1.8H104.21V13.248H106.21ZM105.21 2.8H113.49V0.799998H105.21V2.8ZM127.808 24.444L127.113 25.163L127.113 25.163L127.808 24.444ZM124.568 1.8V0.799998H123.568V1.8H124.568ZM133.064 1.8H134.064V0.799998H133.064V1.8ZM134.036 19.44L133.244 20.0508L133.249 20.0578L133.255 20.0647L134.036 19.44ZM139.76 19.44L138.979 18.8153L138.973 18.8222L138.968 18.8292L139.76 19.44ZM140.768 1.8V0.799998H139.768V1.8H140.768ZM149.12 1.8H150.12V0.799998H149.12V1.8ZM145.88 24.444L145.185 23.725L145.185 23.725L145.88 24.444ZM136.844 26.576C133.162 26.576 130.427 25.5854 128.503 23.725L127.113 25.163C129.508 27.4786 132.798 28.576 136.844 28.576V26.576ZM128.503 23.725C126.585 21.8708 125.568 19.23 125.568 15.66H123.568C123.568 19.626 124.711 22.8412 127.113 25.163L128.503 23.725ZM125.568 15.66V1.8H123.568V15.66H125.568ZM124.568 2.8H133.064V0.799998H124.568V2.8ZM132.064 1.8V15.408H134.064V1.8H132.064ZM132.064 15.408C132.064 17.3302 132.392 18.9472 133.244 20.0508L134.827 18.8292C134.383 18.2528 134.064 17.1818 134.064 15.408H132.064ZM133.255 20.0647C134.148 21.1815 135.418 21.7 136.916 21.7V19.7C135.917 19.7 135.267 19.3785 134.816 18.8153L133.255 20.0647ZM136.916 21.7C138.412 21.7 139.679 21.1812 140.551 20.0508L138.968 18.8292C138.544 19.3788 137.915 19.7 136.916 19.7V21.7ZM140.54 20.0647C141.425 18.959 141.768 17.3355 141.768 15.408H139.768C139.768 17.1765 139.438 18.241 138.979 18.8153L140.54 20.0647ZM141.768 15.408V1.8H139.768V15.408H141.768ZM140.768 2.8H149.12V0.799998H140.768V2.8ZM148.12 1.8V15.66H150.12V1.8H148.12ZM148.12 15.66C148.12 19.23 147.103 21.8708 145.185 23.725L146.575 25.163C148.977 22.8412 150.12 19.626 150.12 15.66H148.12ZM145.185 23.725C143.26 25.5854 140.526 26.576 136.844 26.576V28.576C140.89 28.576 144.179 27.4786 146.575 25.163L145.185 23.725ZM178.43 2.952L178.024 3.86581L178.024 3.86581L178.43 2.952ZM182.426 6.264L181.588 6.80899L181.588 6.80899L182.426 6.264ZM182.426 16.344L181.588 15.799L181.588 15.799L182.426 16.344ZM178.43 19.656L178.024 18.7422L178.024 18.7422L178.43 19.656ZM168.71 20.808V19.808H167.71V20.808H168.71ZM168.71 27V28H169.71V27H168.71ZM160.214 27H159.214V28H160.214V27ZM160.214 1.8V0.799998H159.214V1.8H160.214ZM174.398 13.5L175.057 14.2526L175.065 14.245L175.074 14.2372L174.398 13.5ZM174.398 9.144L173.722 9.88115L173.731 9.88896L173.74 9.89658L174.398 9.144ZM168.71 8.352V7.352H167.71V8.352H168.71ZM168.71 14.256H167.71V15.256H168.71V14.256ZM172.346 2.8C174.566 2.8 176.45 3.16617 178.024 3.86581L178.836 2.03819C176.954 1.20182 174.783 0.799998 172.346 0.799998V2.8ZM178.024 3.86581C179.594 4.5635 180.768 5.54736 181.588 6.80899L183.265 5.71901C182.213 4.10064 180.722 2.8765 178.836 2.03819L178.024 3.86581ZM181.588 6.80899C182.406 8.06807 182.83 9.55388 182.83 11.304H184.83C184.83 9.21412 184.318 7.33993 183.265 5.71901L181.588 6.80899ZM182.83 11.304C182.83 13.0541 182.406 14.5399 181.588 15.799L183.265 16.889C184.318 15.2681 184.83 13.3939 184.83 11.304H182.83ZM181.588 15.799C180.768 17.0606 179.594 18.0445 178.024 18.7422L178.836 20.5698C180.722 19.7315 182.213 18.5074 183.265 16.889L181.588 15.799ZM178.024 18.7422C176.45 19.4418 174.566 19.808 172.346 19.808V21.808C174.783 21.808 176.954 21.4062 178.836 20.5698L178.024 18.7422ZM172.346 19.808H168.71V21.808H172.346V19.808ZM167.71 20.808V27H169.71V20.808H167.71ZM168.71 26H160.214V28H168.71V26ZM161.214 27V1.8H159.214V27H161.214ZM160.214 2.8H172.346V0.799998H160.214V2.8ZM171.806 15.256C173.082 15.256 174.225 14.9798 175.057 14.2526L173.74 12.7474C173.419 13.0282 172.834 13.256 171.806 13.256V15.256ZM175.074 14.2372C175.897 13.4825 176.262 12.4601 176.262 11.304H174.262C174.262 12.0199 174.051 12.4615 173.722 12.7628L175.074 14.2372ZM176.262 11.304C176.262 10.1495 175.897 9.12695 175.057 8.39142L173.74 9.89658C174.051 10.1691 174.262 10.5865 174.262 11.304H176.262ZM175.074 8.40684C174.242 7.64478 173.092 7.352 171.806 7.352V9.352C172.824 9.352 173.402 9.58722 173.722 9.88115L175.074 8.40684ZM171.806 7.352H168.71V9.352H171.806V7.352ZM167.71 8.352V14.256H169.71V8.352H167.71ZM168.71 15.256H171.806V13.256H168.71V15.256Z" fill="#101832"/>
</svg>
</div>
      {/* <h2>Sign Up</h2> */}
        <form onSubmit={this.handleSignUp} className='flex'>
          <label htmlFor="username">username </label>
          <input className='margin-bottom' type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label htmlFor="password">password </label>
          <input className='margin-bottom'type="password" value={password} name="password" required onChange={this.handleChange}/>
          <button className="btn cta bg" type="submit" value="Create account">Create account</button>
        </form>
      </div>
      </div>
    )
  }
}
