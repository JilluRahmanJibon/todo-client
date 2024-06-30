import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
	// const {todos} = useAppSelector((state)=>state.todos)
	// {pollingInterval:1000} use for mutation
	const [priority, setPriority] = useState("");

	const { data: todos, isLoading, isError } = useGetTodosQuery(priority);

	if (isLoading) {
		return (
			<p className="text-center h-screen w-full font-bold text-3xl ">
				Loading...
			</p>
		);
	}
	return (
		<div>
			<div className="flex justify-between mb-5 ">
				<AddTodoModal />
				<TodoFilter priority={priority} setPriority={setPriority} />
			</div>
			<div className="bg-primary-gradient w-full h-full rounded-xl  p-[5px]">
				{todos?.data?.length ? (
					<div className="bg-white p-5 w-full h-full rounded-lg space-y-3">
						{todos?.data?.map(item => (
							<TodoCard key={item._id} {...item} />
						))}
					</div>
				) : (
					<div className="bg-white text-2xl font-bold p-5 flex justify-center items-center rounded-md">
						<p>There is no task pending</p>{" "}
					</div>
				)}
			</div>
		</div>
	);
};

export default TodoContainer;
