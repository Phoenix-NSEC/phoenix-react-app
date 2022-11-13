import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useParams, useLocation } from 'react-router-dom';
import { Avatar, Heading, Text, AvatarBadge } from '@chakra-ui/react';
import { GoVerified, GoUnverified } from 'react-icons/go';
import logo from "../../static/img/logo2.png";
import Pdf from "react-to-pdf";
import axios from "axios";

const baseURL = "https://api.phoenixnsec.in";

const Card = ({ uname, sess, dept, avatar, memId, isVerified, value, ref, blur }) => {
    return (
        <div p={5} ref={ref} className={`bg-gray-600 text-white aspect-[22/13] flex flex-col space-y-2 drop-shadow-2xl p-2 rounded-lg m-auto ${blur ? "blur-md" : ""}`}>
            <div className="flex flex-row">
                <div className="flex flex-col">
                    <img src={logo} alt="Phoenix Logo" className="w-[10em] h-100" />

                </div>
                <div className="flex flex-col justify-end items-end">
                    <Heading as='h5' size='sm' className="max-w-xs">&nbsp;| The Official Tech Club of NSEC</Heading>
                    <div className={`rounded-md p-[2px] text-black ${(isVerified ? 'bg-green-600 ' : 'bg-orange-500')}`}>
                        {isVerified ? "PREMIUM MEMBER" : "UNVERIFIED MEMBER"}
                    </div>
                </div>
            </div>
            <div className="border-gray-500 border-[4px] rounded-md p-2 space-y-3 flex flex-col justify-middle">
                <div className="flex flex-row">
                    <div className="flex flex-row gap-4 content-evenly">
                        <div className="flex flex-col justify-center items-center align-middle">
                            <Avatar size="xl" bg='teal.500' src={avatar} >
                                <AvatarBadge boxSize='0.8em' border='0px'>
                                    {isVerified ?
                                        <GoVerified color="green" border="black" /> :
                                        <GoUnverified color="tomato" border="black" />}
                                </AvatarBadge>
                            </Avatar>
                        </div>
                        <div className="flex flex-col">
                            <Text className="max-w-xs"><b>Name:</b> {uname}</Text>
                            <Text className="max-w-xs"><b>Session:</b> {sess}</Text>
                            <Text className="max-w-xs"><b>Department:</b> {dept}</Text>
                            <Text className="max-w-xs"><b>Member ID:</b> {memId}</Text>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row items-center juftify-middle place-content-center ">
                    <QRCodeSVG className="h-auto shadow-xl self-center" size={90} value={value} bgColor="#4B5563" color="#FFFFFF" level="H" />
                </div>
            </div>
        </div >
    )
}

function Member() {
    const [member, setMember] = React.useState(null);
    const memId = useParams().MemId;
    const ref = React.createRef();

    React.useEffect(() => {
        axios.get(baseURL + `/api/v1/member/${memId}`).then((response) => {
            setMember(response.data);
        }).catch((err) => {
            if (err.response) {
                alert("Error Fetching Request:", err.response.data.detail);
            }
        });
    }, []);

    const options = {
        orientation: 'landscape',
        unit: 'in',
        format: [22, 13]
    };

    return (member ?
        <div >
            <div ref={ref} className="flex flex-col justify-center item-center h-[100vh] w-full m-auto">
                <Card
                    ref={ref}
                    uname={member?.name}
                    sess={member?.graduation}
                    dept={member?.department}
                    memId={member?.id}
                    isVerified={member?.is_verified}
                    avatar={member?.avatar}
                    value={window.location.href}
                />

                <Pdf targetRef={ref} filename="code-example.pdf" options={options}>
                    {({ toPdf }) => <button onClick={toPdf} className="text-white">Generate Pdf</button>}
                </Pdf>
            </div>
        </div>
        : <div>

            <div ref={ref} className="flex flex-col content-start item-center h-[100vh] w-full m-auto">
                <Card
                    ref={ref}
                    uname={member?.name}
                    sess={member?.graduation}
                    dept={member?.department}
                    memId={member?.id}
                    isVerified={member?.is_verified}
                    avatar={member?.avatar}
                    value={window.location.href}
                    blur={true}
                />
            </div>
        </div>
    )
}

export default Member