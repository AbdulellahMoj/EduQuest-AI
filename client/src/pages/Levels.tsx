import ActiveLevel from "../assets/ActiveLevel";
import LevelSelector from "../components/LevelSelector";
import Unit from "../components/Unit";
import { Link, useNavigate, useParams } from "react-router-dom";
import courseData from "../components/CourseData";

function Levels() {
  const { courseCode } = useParams<{ courseCode: string }>();
  const navigate = useNavigate();

  if (!courseCode || !courseData[courseCode]) {
    return <Link to="/default-course" />;
  }

  const course = courseData[courseCode];

  const handleLevelClick = (unitId: number, levelId: number) => {
    navigate(`/${courseCode}/unit/${unitId}/level/${levelId}/questions`);
  };

  return (
    <div className="levels">
      <div className="units-with-levels">
        {course.units.map((unit) => (
          <div id={`${courseCode}-${unit.unitId}`} key={unit.unitId}>
            <Unit title={`Unit ${unit.unitId}`} text={unit.unitText} />
            <div className="mini-levels">
              {unit.levels.map((level, index) => (
                <div key={level.levelId}>
                  <ActiveLevel
                    level={level.levelId}
                    padding={index % 2 !== 0 ? 0 : 200}
                    active={index === 0}
                    onClick={() => handleLevelClick(unit.unitId, level.levelId)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="level-selector">
        <LevelSelector levels={course.units.length} courseCode={courseCode!} />
      </div>
    </div>
  );
}

export default Levels;
