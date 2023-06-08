import React, { useRef, useEffect } from "react";
import '../../App.module.css'
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

const Room = () => {
  const { roomID } = useParams();
  const meetingRef = useRef(null);

  useEffect(() => {
    const meeting = async () => {
      const appID = 946219318;
      const serverSecret = "8e0b853d79deae0bcbfe949b73ca46a4";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        Date.now().toString(),
        "Enter Your Name"
      );
      const zp = ZegoUIKitPrebuilt.create(kitToken);
      zp.joinRoom({
        container: meetingRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
      });
    };

    meeting();
  }, [roomID]);

  return (
    <div
      ref={meetingRef}
      style={{ width: "100vw", height: "100vh", backgroundColor: "transparent" }}
    ></div>
  );
};

export default Room;
