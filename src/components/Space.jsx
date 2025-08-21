import Img1 from '/assets/img/1.jpg';

function Space() {
    return (
        <div className="w-full h-[500px] bg-[#f8f6ef] relative overflow-hidden">
            <img
                src={Img1}
                alt=""
                className="w-full h-full object-cover object-center"
            />
            
            <div className="absolute left-0 bottom-0 p-12 text-white select-none z-10">
                <h2 className="text-4xl font-bold mb-4">Story</h2>
                <p className="mb-6 text-lg leading-snug">
                    아로마티카는 아로마테라피의 정수를 담아
                </p>
                <a
                    href="#"
                    className="relative text-base inline-block underline"
                >
                    view more
                    <span
                        className="block absolute left-0 -bottom-1 h-[2px]  w-full scale-x-0"
                    />
                </a>
            </div>
        </div>
    );
}

export default Space;
