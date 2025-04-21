
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteAlert from "../DeleteAlert/DeleteAlert";

export default function ReportedVideos() {
  

  const [currentPage, setCurrentPage] = useState(1);
   const [del, setDelete] = useState(false);
  const cardsPerPage = 4;

  function handelDelete(){

    setDelete(!del);
  }

  const data = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: `Card ${i + 1}`,
    description: `This is the description for card ${i + 1}`,
  }));


  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  // eslint-disable-next-line no-unused-vars
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

 
  const [ReportedVideos, setReportedVideos] = useState([]);


  const totalPages = Math.ceil(data.length / cardsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(()=>{
    getReportedVideos();
  } , [ currentPage])

  
     ////// getReportedVideos

  async function getReportedVideos() {
    try {
      const options = {
        url:`https://plansplus.runasp.net/api/ReportVideos?pageNumber=${currentPage}&pageSize=${cardsPerPage}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      
       }
    
       const data  = await axios.request(options);
       if (data.status === 200) {
        
         setReportedVideos(data.data.data.items)
       }
    } catch (error) {
       console.error(error)
    }
}

 //// deleteVideo 
    async  function deleteVideo(VideoId) {
      const loadingToaster = toast.loading("Loading...");
    
     try {
      const options = {
        url: `https://plansplus.runasp.net/api/ReportVideos/Approve-Report?videoId=${VideoId}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        
      }
        const {data} =  await axios.request(options)
        if(data.message === "Operation completed Successfully") {
          toast.success("Video Deleted Successfully")
          getReportedVideos()
        }
        
     } catch (error) {
       console.error(error)
     } finally {
      toast.dismiss(loadingToaster);
     }

    }
    
    /// igonore videos 
    async function ignoreVideo(VideoId) {
      const loadingToaster = toast.loading("Loading...");
    
      try {
        const options = {
          url: `https://plansplus.runasp.net/api/ReportVideos/Ignore-Report?VideoId=${VideoId}`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        };
        const { data } = await axios.request(options);
        
        if (data.message === "Operation completed Successfully") {
          toast.success("Video Ignored Successfully");
         getReportedVideos()
        }
      } catch (error) {
        console.error(error);
      } finally {
        toast.dismiss(loadingToaster);
      }
    }
      
       
     

  return (
    <>
     { !ReportedVideos  ? <h2>Loading ......</h2> : <section>
        { ReportedVideos.length === 0 ? <div 
          className="flex flex-col items-center justify-center  py-16 px-4 text-center"
          style={{
            background:
              'linear-gradient(165.22deg, #1F2B43 40.11%, #1B3E3C 60.03%, #286447 79.96%, #329C4A 119.8%)',
          }}
          >
           <div className="w-20 h-20 mb-5 rounded-full bg-red-50 flex items-center justify-center">
          <svg 
         xmlns="http://www.w3.org/2000/svg" 
         className="h-10 w-10 text-red-500" 
         fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
       >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
         d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
        <path 
         strokeLinecap="round" 
         strokeLinejoin="round" 
         strokeWidth={2} 
         d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" 
       />
         </svg>
      </div>
       <h2 className="text-2xl font-medium text-white mb-2">No Reported Videos Found</h2>
         <p className="text-white max-w-md">
            The moderation queue is currently empty. No videos have been reported by users.
        </p>
          </div> :
         <div className="w-full p-4">
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
           {ReportedVideos.map((video, index) => (
          
             
             <div
               key={index}
               className="bg-white border border-gray-200 rounded-lg shadow-sm"
               style={{
                 background:
                   'linear-gradient(165.22deg, #1F2B43 40.11%, #1B3E3C 60.03%, #286447 79.96%, #329C4A 119.8%)',
               }}
             >
              <div className="flex items-center p-4 border-b">
                 
                 <img
                   className="w-10 h-10 rounded-full mr-3"
                   src={video.publisherProfilePic}
                   alt={video.publisherName}
                 />
                 <div>
                   <h4 className="font-semibold text-white">{video.publisherName}</h4>
                   <p className="text-xs text-white">{video.publisherBio}</p>
                 </div>
                 <span className="ml-auto bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                   Reports: {video.totalUserReports}
                 </span>
               </div>
       
               {/* Video Thumbnail */}
               <img
                 className="w-full h-48 object-cover"
                 src={video.publisherProfilePic}
                 alt={video.title}
               />
       
               {/* Video Info Section */}
               <div className="p-4">
                 <h3 className="mb-2 text-xl font-bold text-white">{video.title}</h3>
                 <p className="mb-3 text-white">{video.description}</p>
       
                 {/* Action Buttons */}
                 <div className="flex space-x-2">
                   <button
                   onClick={() => ignoreVideo(video.videoId)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transctions-color duration-300">
                     Ignore
                   </button>
                   <button 
                     onClick={() => 
                      setDelete(true)
                      }
                   className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded transctions-color duration-300">
                     Delete
                   </button>
                    {
                                   del ? <DeleteAlert  onConfirm={() => deleteVideo(video.videoId)} onClose={handelDelete} /> : null
                  }
                   
                 </div>
               </div>
             </div>
             
           ))}
         </div>
       
         {/* Pagination */}
         <div className="flex justify-center mt-6 space-x-2">
           {Array.from({ length: totalPages }, (_, i) => (
             <button
               key={i}
               onClick={() => paginate(i + 1)}
               className={`px-4 py-2 rounded ${
                 currentPage === i + 1 ? 'bg-mainColor text-white' : 'bg-gray-200'
               }`}
             >
               {i + 1}
             </button>
           ))}
         </div>
              </div>

        }
      
      </section>}
     

      </>
  );
}

