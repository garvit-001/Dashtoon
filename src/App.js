import { useRef, useState } from "react";
import "./App.css";
import html2canvas from "html2canvas";
import Items from "./components/Items/Items";
import StartBtn from "./components/StartBtn/StartBtn";
import backgroundImage from "./images/background.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from "./components/Landing/Landing";
function App() {
  const [start, setStart] = useState(false);
  const notif = ({ text, err }) => {
    if (err) {
      toast.error(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.success(text, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const ele = [];
  for (let i = 1; i <= 10; i++) {
    ele.push(
      <div key={i} id="grid-item" className={`item-${i}`}>
        <Items notif={notif} />
      </div>
    );
  }
  const comicRef = useRef(null);
  const save = async () => {
    try {
      console.log(ele.length);
      const comic = await html2canvas(comicRef.current);
      const comicURL = comic.toDataURL("image/png");
      const comicImg = document.createElement("a");
      comicImg.href = comicURL;
      comicImg.download = "comic_img.png";
      comicImg.click();
      notif({ text: "Saved Successfully", err: false });
    } catch (error) {
      notif({ text: "Could not save", err: false });
    }
  };
  return (
    <div className="App">
      <ToastContainer />
      <div
        className="background"
        style={{
          // opacity: start ? 0.5 : 0.7,
          backgroundImage: `url(https://t4.ftcdn.net/jpg/05/16/83/17/360_F_516831744_dhul1X3uQi6iwDCwvsdObiEl5dt42bWx.jpg)`,
        }}
      ></div>
      <div className="header head-text">ComicStaan</div>
      <div className="image-grid" ref={comicRef}>
        {start ? (
          ele
        ) : (
          <div className="landing">
            <Landing />
          </div>
        )}
      </div>
      <div style={{ margin: "1rem" }}>
        <StartBtn setStart={setStart} start={start} save={save} />
      </div>
    </div>
  );
}

export default App;
