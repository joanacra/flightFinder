import { useState } from "react";
import "./FlexibleScheduler.css";

interface Props {
    onChange: (selectedWeekDay: any) => void;
}

const PickWeekDayFlex = (props: Props) => {
    const [selectedWeekDay, setSelectedWeekDay] = useState("");

    const handleWeekDaySelection = (weekDay: string) => (e: any) => {
        e.preventDefault();
        props.onChange(weekDay);
        setSelectedWeekDay(weekDay);
    };

    return (
        <div className="questionEntry">
            <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M57.5 23.3001C57.6566 22.6577 57.5675 21.98 57.25 21.4001C56.4398 19.9942 55.3599 18.7621 54.0724 17.7745C52.7849 16.787 51.315 16.0634 49.7471 15.6453C48.1793 15.2272 46.5443 15.1228 44.936 15.3382C43.3277 15.5535 41.7777 16.0843 40.375 16.9001L35 20.0001L22.5 14.1251C22.1447 13.9409 21.7503 13.8448 21.35 13.8448C20.9498 13.8448 20.5554 13.9409 20.2 14.1251L12.7 18.4501C12.3294 18.6639 12.0198 18.9692 11.8009 19.3369C11.5821 19.7046 11.4613 20.1223 11.45 20.5501C11.4379 20.981 11.5375 21.4077 11.739 21.7888C11.9405 22.1699 12.2371 22.4924 12.6 22.7251L20.85 27.9251L16.5 30.4251L4.55003 31.8751C4.06965 31.9345 3.61684 32.1321 3.24659 32.4439C2.87634 32.7557 2.60456 33.1682 2.46426 33.6315C2.32395 34.0948 2.32116 34.5888 2.4562 35.0536C2.59125 35.5185 2.85833 35.9341 3.22503 36.2501L12.075 43.9C13.2402 45.012 14.7323 45.7194 16.3306 45.9175C17.929 46.1156 19.5487 45.7939 20.95 45.0001L56.25 24.8251C56.5509 24.6689 56.8168 24.4532 57.0317 24.191C57.2466 23.9288 57.4059 23.6257 57.5 23.3001ZM18.675 40.8001C18.1948 41.0643 17.641 41.1634 17.099 41.0821C16.5569 41.0008 16.0566 40.7436 15.675 40.35L10.925 36.2751L17.75 35.4501C18.0854 35.4071 18.4086 35.2965 18.7 35.1251L27.1 30.3001C27.4743 30.0841 27.7861 29.7748 28.0052 29.4023C28.2243 29.0299 28.3431 28.6071 28.35 28.1751C28.3552 27.746 28.2498 27.3228 28.044 26.9462C27.8382 26.5697 27.5389 26.2524 27.175 26.0251L18.925 20.8001L21.675 19.2251L34.175 25.0251C34.5304 25.2092 34.9248 25.3053 35.325 25.3053C35.7253 25.3053 36.1197 25.2092 36.475 25.0251L42.875 21.3251C44.1866 20.5901 45.6887 20.2662 47.1866 20.3955C48.6844 20.5247 50.1088 21.1012 51.275 22.0501L18.675 40.8001Z"
                    fill="white"
                />
            </svg>
            <div className="questionInfo">
                <span className="question">
                    What week day do you want to fly out on?
                </span>
                <span className="question mandatory">Mandatory</span>
            </div>
            <div className="questionAnswers answerFlyOutDay">
                <div className="groupOfDays">
                    <div
                        className={
                            selectedWeekDay === "monday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("monday")}
                    >
                        Monday
                    </div>
                    <div
                        className={
                            selectedWeekDay === "tuesday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("tuesday")}
                    >
                        Tuesday
                    </div>
                    <div
                        className={
                            selectedWeekDay === "wednesday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("wednesday")}
                    >
                        Wednesday
                    </div>
                    <div
                        className={
                            selectedWeekDay === "thursday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("thursday")}
                    >
                        Thursday
                    </div>
                </div>
                <div className="groupOfDays">
                    <div
                        className={
                            selectedWeekDay === "friday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("friday")}
                    >
                        Friday
                    </div>
                    <div
                        className={
                            selectedWeekDay === "saturday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("saturday")}
                    >
                        Saturday
                    </div>
                    <div
                        className={
                            selectedWeekDay === "sunday"
                                ? "dayOfTheWeek selectedWeekDay"
                                : "dayOfTheWeek"
                        }
                        onClick={handleWeekDaySelection("sunday")}
                    >
                        Sunday
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PickWeekDayFlex;
