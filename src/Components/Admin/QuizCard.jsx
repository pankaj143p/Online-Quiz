import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { deleteQuiz, publishQuiz } from "../../services/quiz";
import toast from "react-hot-toast";
import "./QuizCard.css";

const QuizCard = ({
  title,
  category,
  description,
  duration,
  quiz_id,
  questions,
  setRefresh,
  level,
  published,
  numberOfQuestions,
}) => {
  const { mutate } = useMutation({
    mutationFn: ({ quiz_id }) => {
      return deleteQuiz({ quizId: quiz_id });
    },
    onSuccess: (data) => {
      toast.success("Quiz deleted successfully");
      setRefresh((prev) => !prev);
      console.log(data);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { mutate: publishQuizMutate, isLoading: publishQuizIsLoading } =
    useMutation({
      mutationFn: ({ quizId }) => {
        return publishQuiz({ quizId, publish: true });
      },
      onSuccess: (data) => {
        toast.success("Quiz Published successfully");
        setRefresh((prev) => !prev);
        console.log(data);
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });
  console.log(publishQuizIsLoading);

  useEffect(() => {
    console.log("Quiz : ", title);
    console.log("published === true : ", published === true);
    console.log("numberOfQuestions : ", numberOfQuestions);
    console.log("questions.length : ", questions);
    console.log(
      "numberOfQuestions !== questions.length : ",
      numberOfQuestions !== questions
    );
  }, [numberOfQuestions, published, questions, title]);

  const deleteHandler = (data, error) => {
    mutate({ quiz_id });
  };

  const handlePublish = () => {
    publishQuizMutate({ quizId: quiz_id });
  };
  return (
    <>
      {/* <div className="card"> */}
      <div className="card-body">
        <div className="Quizs-container">
          <h5 className="card-title">Tittle : {title}</h5>
          <h6 className="mb-2 card-subtitle text-muted">
            Category : {category}
          </h6>
          <p className="card-text">Description : {description}</p>
          <p className="card-text">Time taken: {duration} min</p>
          <p className="card-text">Questions: {questions}</p>

          {/* <Link to={`editQuiz/${quiz_id}`}>
            <button className="updating-btn">Edit Quiz</button>
          </Link>  */}
          <Link to={`editQuiz/${quiz_id}`}>
            <button className="updating-btn">Edit Quiz</button>
          </Link>

          <button className="updating-btn" onClick={deleteHandler}>
            Delete
          </button>

          <button
            className="updating-btn"
            // disabled={published === true || numberOfQuestions !== questions}
            onClick={() => handlePublish()}
          >
            {published === true ? "Published" : "Publish"}
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default QuizCard;
