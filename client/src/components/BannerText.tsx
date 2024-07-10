import BannerCircle from "../assets/BannerCircle";

interface Props {
  code: string;
  course: string;
  rate: string;
  number: number;
}

function BannerText({ code, course, rate, number }: Props) {
  return (
    <div className="banner-text">
      <div className="banner-top">
        <div className="banner-number">{number}</div>
        <div className="banner-circle">
          <BannerCircle />
        </div>

        <div className="banner-code">{code}</div>
        <div className="banner-course">{course}</div>
      </div>

      <div className="banner-rate">{rate}</div>
    </div>
  );
}

export default BannerText;
