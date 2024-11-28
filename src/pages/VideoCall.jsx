import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const VideoCall = () => {
    const { roomId } = useParams();
    const myMeetingRef = useRef(null);
    let zc;

    useEffect(() => {
        const appId = 866265624;
        const serverSecret = "452b5f9566ec91a43507891b9ba5c31a"; 
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appId,
            serverSecret,
            roomId,
            Date.now().toString(),
            "Murilo teste"
        );

        if (!kitToken) {
            console.log("erro ao gerar o kit token")
        }

        const zc = ZegoUIKitPrebuilt.create(kitToken);

        if (zc && typeof zc.joinRoom === 'function') {
            zc.joinRoom({
            container: myMeetingRef.current,
            sharedLinks: [{
                name: 'Copiar Link',
                url: `http://localhost:5173/chat/room/${roomId}`
            }],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
            },
            showScreenSharingButton: false
        });
        } else {
            console.log("Erro ao criar a instância do ZegoUIKitPrebuilt.")
        }

        return () => {
            if (zc && typeof zc.leaveRoom === 'function') {
                zc.leaveRoom();
            }
        };
    }, [roomId]);

    return (
        <div>
            <div ref={myMeetingRef} />
        </div>
    );
};

export default VideoCall;