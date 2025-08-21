import Img1 from '/assets/img/1.jpg';
import Img2 from '/assets/img/2.jpg';
import Img3 from '/assets/img/3.jpg';
import Img4 from '/assets/img/4.jpg';

function Life() {
    return (
        <div className="flex flex-col justify-between h-[500]px bg-[#f8f6ef] my-20">
            <div className="flex item-center justify-between m-8 px-4">
                <h1 className="text-4xl font-bold">AROMATICA & Life</h1>
                <a className="text-lg text-gray-700 underline">view all</a>
            </div>
            <div className="flex w-full px-4">
                {[Img1, Img2, Img3, Img4].map((img, idx) => (
                    <div key={idx} className="flex-1 bg-[#f8f6ef] rounded-lg p-2 flex flex-col h-[360px]">
                        <div className="flex-1 basis-3/5 flex items-center justify-center overflow-hidden">
                            <img src={img} alt="" className="w-full h-full object-cover rounded" />
                        </div>
                        <div className="flex-1 basis-1/5 flex items-center ">
                            <h1 className="text-lg font-bold">카드 타이틀</h1>
                        </div>
                        <div className="flex-1 basis-1/5 flex items-center ">
                            <p className="text-sm text-gray-600 text-center">세계최고의 화장품이 되겠다.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Life;
