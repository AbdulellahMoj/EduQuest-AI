import BackDrop from "../assets/BackDrop";
import CloudIcon from "../assets/CloudIcon";
interface Props {
  color: string;
  number: number;
  background: string;
  onClick?: () => void;
  onOpenModal: () => void;
}

function UploadBanner({ color, number, background, onOpenModal }: Props) {
  return (
    <div className="banner-container" onClick={onOpenModal}>
      <div className="banner-graphics">
        <svg
          style={{ width: "180px", position: "absolute", zIndex: 1 }}
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 287.91 801.18"
        >
          <defs>
            <clipPath id="clip-path">
              <path
                id="SVGID"
                className="cls-1"
                d="M4.54,753.28V47.22H17.47V35.28h11.9V23.35h11.9V11.41H246.65V22h11.9V34h11.9V45.89h12.93V752.62h-11.9v11.91H259.73v12H247.68v12.59H41.27V777.15H29.37V765.22H17.47V753.28ZM14.88,11.42h0Z"
              />
            </clipPath>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <polygon
                className={`cls-22${number}`}
                points="0.5 763.84 0.5 37.34 13.81 37.34 13.81 25.06 26.05 25.06 26.05 12.78 38.29 12.78 38.29 0.5 249.62 0.5 249.62 11.41 261.86 11.41 261.86 23.69 274.11 23.69 274.11 35.97 287.41 35.97 287.41 763.16 275.17 763.16 275.17 775.44 262.93 775.44 262.93 787.72 250.69 787.72 250.69 800.68 38.29 800.68 38.29 788.4 26.05 788.4 26.05 776.12 13.81 776.12 13.81 763.84 0.5 763.84"
              />
              <g className="cls-3">
                <path
                  className="cls-4"
                  d="M4.54,756.28H17.47v-6H4.54Zm9.93-3v11.94h6V753.28Zm3,14.94h11.9v-6H17.47Zm8.9-3v11.93h6V765.22Zm3,14.93h11.9v-6H29.37Zm8.9-3v11.93h6V777.15Zm3,14.93H247.68v-6H41.27Zm209.41-3V776.49h-6v12.59Zm-3-9.59h12.05v-6H247.68Zm15.05-3v-12h-6v12Zm-3-9h11.75v-6H259.73Zm14.75-3V752.62h-6v11.91Zm-3-8.91h11.9v-6h-11.9Zm14.9-3V45.89h-6V752.62Zm-3-709.73H270.45v6h12.93Zm-9.93,3V34h-6V45.89Zm-3-14.93h-11.9v6h11.9Zm-8.9,3V22h-6V34Zm-3-14.94h-11.9v6h11.9Zm-8.9,3V11.41h-6V22Zm-3-13.61H41.27v6H246.65Zm-208.38,3V23.35h6V11.41Zm3,8.94H29.37v6h11.9Zm-14.9,3V35.28h6V23.35Zm3,8.93H17.47v6h11.9Zm-14.9,3V47.22h6V35.28Zm3,8.94H4.54v6H17.47Zm-15.93,3V753.28h6V47.22Zm13.34-32.8h7.76v-6H14.88Zm10.76-3h0Zm-3-3H14.88v6h7.76Zm-10.76,3h0Zm5.59,741.87h3v-3h-3Zm0,11.94h-3v3h3Zm11.9,0h3v-3h-3Zm0,11.93h-3v3h3Zm11.9,0h3v-3h-3Zm0,11.93h-3v3h3Zm206.41,0v3h3v-3Zm0-12.59v-3h-3v3Zm12.05,0v3h3v-3Zm0-12v-3h-3v3Zm11.75,0v3h3v-3Zm0-11.91v-3h-3v3Zm11.9,0v3h3v-3Zm0-706.73h3v-3h-3Zm-12.93,0h-3v3h3Zm0-11.93h3V31h-3Zm-11.9,0h-3v3h3Zm0-11.94h3V19h-3Zm-11.9,0h-3v3h3Zm0-10.61h3v-3h-3Zm-205.38,0v-3h-3v3Zm0,11.94v3h3v-3Zm-11.9,0v-3h-3v3Zm0,11.93v3h3v-3Zm-11.9,0v-3h-3v3Zm0,11.94v3h3v-3ZM4.54,753.28h-3v3h3Zm0-706.06v-3h-3v3Zm18.1-35.8v3h3v-3Zm0,0h3v-3h-3Zm-7.76,0h-3v3h3Zm0,0v-3h-3v3Z"
                />
              </g>
            </g>
          </g>

          <style>
            {`.cls-1{fill:none;clip-rule:evenodd;}.cls-22${number}{fill:${color};stroke:#000;stroke-miterlimit:10;fill-rule:evenodd;}.cls-3{clip-path:url(#clip-path);}.cls-4{fill:#fff;}`}
          </style>
        </svg>
        <div className="background-image">
          <BackDrop background={background} />
        </div>
        <div className="banner-cloud">
          <CloudIcon />
          <div className="banner-cloud-text">Upload Textbook</div>
        </div>
        <div className="click-area"></div>
      </div>
    </div>
  );
}

export default UploadBanner;
