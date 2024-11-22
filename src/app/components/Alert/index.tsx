import Loading from "../Loading";
import Toast from "../Toast";
import './styles.css'
import useAlertStore from "../../zustand/alert";

const Alert = () => {

   const { loading, errors, type, message } = useAlertStore();

   return (
      <div>
         {loading && <Loading />}
         {errors && <Toast title="Error" message={errors} type={type} />}
         {message && <Toast title={type === "success" ? "Buen trabajo" : type === "notification" ? "Notificacion" : "Error"} message={message} type={type} />}
      </div>
   )
}

export default Alert;
