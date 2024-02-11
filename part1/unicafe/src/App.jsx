import { useState } from "react";

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text={"good"} />
            <Button onClick={() => setNeutral(neutral + 1)} text={"neutral"} />
            <Button onClick={() => setBad(bad + 1)} text={"bad"} />

            <h1>statistics</h1>

            {good + neutral + bad > 0 ? (
                <Statistics good={good} neutral={neutral} bad={bad} />
            ) : (
                <p>No feedback given</p>
            )}
        </div>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    const total = good + neutral + bad;

    return (
        <table>
            <tbody>
                <StatisticLine text={"good"} value={good} />
                <StatisticLine text={"neutral"} value={neutral} />
                <StatisticLine text={"bad"} value={bad} />

                <StatisticLine text={"all"} value={total} />
                <StatisticLine text={"average"} value={(good - bad) / total} />
                <StatisticLine
                    text={"all"}
                    value={(good / total) * 100 + " %"}
                />
            </tbody>
        </table>
    );
};

const StatisticLine = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default App;
