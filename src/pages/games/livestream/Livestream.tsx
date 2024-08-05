import { useEffect , useRef} from "react"
import AgoraRTC, { 
  IAgoraRTCClient, 
  ILocalVideoTrack, 
  ILocalAudioTrack, 
  AudienceLatencyLevelType,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
 } from 'agora-rtc-sdk-ng';


  interface RTC {
  client: IAgoraRTCClient | null;
  localAudioTrack: ILocalAudioTrack | null;
  localVideoTrack: ILocalVideoTrack | null;
}

const rtc: RTC = {
  client: null,
  localAudioTrack: null,
  localVideoTrack: null,
};

const options = {
  appId: '98761052a5604d9d8d006180295d9a33',
  channel: 'Livestreaming',
  token: '007eJxTYDjEGcyTHzh/zs+SUsEJpw8zr7mr8fDF/dkqVo1lN4syFM4oMFhamJsZGpgaJZqaGZikWKZYpBgYmBlaGBhZmqZYJhobt65an9YQyMhwti+AlZEBAkF8XgafzLLU4pKi1MTczLx0BgYAdjcjCw==',
  uid: '123456',
};

const Livestream = () => {
  const hostJoinRef = useRef<HTMLButtonElement>(null);
  const audienceJoinRef = useRef<HTMLButtonElement>(null);
  const leaveRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    rtc.client = AgoraRTC.createClient({
      mode: 'live',
      codec: 'vp8',
      clientRoleOptions: {
        level: AudienceLatencyLevelType.AUDIENCE_LEVEL_LOW_LATENCY,
      },
    });

    rtc.client.on('token-privilege-will-expire',async() => {
      const response = await fetch(`https://smmserver.onrender.com/api/livestream/livestream-token?channelName=${options.channel}&uid=${options.uid}&role=publisher`)
      const data = await response.json()

      rtc.client?.renewToken(data.token)
      console.log('Token Renewed')
    })

    rtc.client.on('token-privilege-did-expire', async () => {
      const response = await fetch(`https://smmserver.onrender.com/api/livestream/livestream-token?channelName=${options.channel}&uid=${options.uid}&role=publisher`);
      const data = await response.json();
      await rtc.client?.renewToken(data.token);
      console.log('Token renewed');
    });
    const handleHostJoin = async () => {

      const response = await fetch(`https://smmserver.onrender.com/api/livestream/livestream-token?channelName=${options.channel}&uid=${options.uid}&role=publisher`)
      const data = await response.json()

      rtc.client?.setClientRole('host');
      await rtc.client?.join(options.appId, options.channel, data.token, options.uid);
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      await rtc.client?.publish([rtc.localAudioTrack, rtc.localVideoTrack]);

      const localPlayerContainer = document.createElement('div');
      localPlayerContainer.id = options.uid;
      localPlayerContainer.textContent = `Local user ${options.uid}`;
      localPlayerContainer.style.width = '640px';
      localPlayerContainer.style.height = '480px';
      document.body.append(localPlayerContainer);
      rtc.localVideoTrack.play(localPlayerContainer);
      console.log('publish success!');
    };

    const handleAudienceJoin = async () => {

      const response = await fetch(`https://smmserver.onrender.com/api/livestream/livestream-token?channelName=${options.channel}&uid=${0}&role=subscriber`)
      const data = await response.json()
      console.log(data.token,'tttttttttttthiiiiiiiiiiissssssss is    data')
      rtc.client?.setClientRole('audience');


      await rtc.client?.join(options.appId, options.channel,data.token, null);

      rtc.client?.on('user-published', async (user: any, mediaType: 'audio' | 'video') => {
        await rtc.client?.subscribe(user, mediaType);
        console.log('subscribe success');

        if (mediaType === 'video') {
          const remoteVideoTrack = user.videoTrack as IRemoteVideoTrack;
          const remotePlayerContainer = document.createElement('div');
          remotePlayerContainer.id = user.uid.toString();
          remotePlayerContainer.textContent = `Remote user ${user.uid}`;
          remotePlayerContainer.style.width = '640px';
          remotePlayerContainer.style.height = '480px';
          document.body.append(remotePlayerContainer);
          remoteVideoTrack.play(remotePlayerContainer);
        }

        if (mediaType === 'audio') {
          const remoteAudioTrack = user.audioTrack as IRemoteAudioTrack;
          remoteAudioTrack.play();
        }
      });

      rtc.client?.on('user-unpublished', (user: any) => {
        const remotePlayerContainer = document.getElementById(user.uid.toString());
        if (remotePlayerContainer) remotePlayerContainer.remove();
      });
    };

    const handleLeave = async () => {
      rtc.localAudioTrack?.close();
      rtc.localVideoTrack?.close();
      const localPlayerContainer = document.getElementById(options.uid);
      if (localPlayerContainer) {
        localPlayerContainer.remove();
      }
      rtc.client?.remoteUsers.forEach((user) => {
        const playerContainer = document.getElementById(user.uid.toString());
        if (playerContainer) playerContainer.remove();
      });
      await rtc.client?.leave();
    };

    hostJoinRef.current?.addEventListener('click', handleHostJoin);
    audienceJoinRef.current?.addEventListener('click', handleAudienceJoin);
    leaveRef.current?.addEventListener('click', handleLeave);

    return () => {
      hostJoinRef.current?.removeEventListener('click', handleHostJoin);
      audienceJoinRef.current?.removeEventListener('click', handleAudienceJoin);
      leaveRef.current?.removeEventListener('click', handleLeave);
    };
  }, []);

  return (
    <div>
      <button ref={hostJoinRef}>Join as Host</button>
      <button ref={audienceJoinRef}>Join as Audience</button>
      <button ref={leaveRef}>Leave</button>
    </div>
  );
}

export default Livestream