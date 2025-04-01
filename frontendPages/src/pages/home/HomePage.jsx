import CreatePost from "./CreatePost";
const HomePage = () => {
	return (
		<>
			<div className='flex-[4_4_0] border-l border-r border-gray-700 min-h-screen'>
				<div className='flex justify-between items-center p-4 border-b border-gray-700'>
					<p className='font-bold'>Create Course</p>
					
				</div>
                <CreatePost />
            </div>
		</>
	);
};
export default HomePage;