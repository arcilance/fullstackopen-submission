const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </div>
    );
};

const Header = (props) => {
    return <h1>{props.course}</h1>;
};

const Content = (props) => {
    return (
        <div>
            {props.parts.map((part) => (
                <Part part={part} key={part.id} />
            ))}
            <Total parts={props.parts} />
        </div>
    );
};

const Total = ({ parts }) => {
    return (
        <p>
            <b>
                total of {parts.reduce((acc, part) => acc + part.exercises, 0)}{" "}
                exercises
            </b>
        </p>
    );
};

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    );
};

export default Course;
