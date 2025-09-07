# Video


Video -> file (encoded)..... -> direct asccess nhi kr skte

use URL for -> VIDEO
WHy URL? -> src="" imf,video,iframe -> convert video into url -> drive file upload -> url
video src="drive_url"

cloudinary -> input: file(img, video, pds, etc) -> return url





--- HOW TO UPLOAD A FILE FROM THE SERVER?
Use "multer" -> pakage(service) -> upload media file to the any server(cloudinary)





FRONTEND: 
VIdeo Call integration front -> WebRTc APis -> capture user media -> camera(video) microphone(audio)
const userVideo = webrtc(video, audio);

Live calling -> socketio

component -> call api(backend)-> data: userVideo

BACKEND:
socket -> listen -> userVideoData

Both user connected -> event trigger -> socket -> trigger api for second user



NOTE-> Frontand and backend use signaling messages (use for calling) -> chunk data - streaming