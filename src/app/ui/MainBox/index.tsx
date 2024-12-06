import styles from './buzon.module.css'
import caja from './../../../../public/svg/buzon.svg'
import { IAuthState, useAuthStore } from '../../zustand/auth'
import { ChangeEvent, useState } from 'react';
import Image from 'next/image';


const MailBox = () => {

    const { sendEmail }: IAuthState = useAuthStore();

    const [email, setEmail] = useState<string>("")

    const sendEmailByEvents = () => {
        sendEmail({
            correo: email
        });
        setEmail("");
    }

    return (

        <div className='bg-[#861F20]'>
            <div className="xl:max-w-screen-2xl mx-auto">
                <div className="flex items-center justify-between pt-10 pb-10 px-10">
                    <div>
                        <h2 className='text-[#fff] font-bold text-4xl'>¡No te pierdas de los mejores eventos!</h2>
                        <div className="flex items-center mt-4">
                            <input type="email" className='outline-none w-11/12 text-[#fff] bg-transparent placeholder:text-[#fff] border-b border-solid border-[#fff] pb-3 font-[300] text-xl' value={email} id="email" name="email" onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} placeholder="Déjanos tu correo y te avisamos" />
                            <button className='border p-2 px-16 rounded-full text-[#fff] border-[#fff] border-solid' onClick={sendEmailByEvents} type="submit">ENVIAR</button>
                        </div>
                    </div>

                    <Image src={caja} alt="caja" width={200} height={100} />
                </div>
            </div>
        </div>

    )

}

export default MailBox