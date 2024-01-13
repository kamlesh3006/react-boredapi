import React, { useState } from 'react';

export default function Home() {
    const [boredData, setBoredData] = useState('');
    const [listOfActivities, setListOfActivities] = useState([]);
    let handleOnClick = (event) => {
        if(event.selected === true)
            event.selected = false;
        else
            event.selected = true;
    }
    let bored = async () => {
        try {
            let getData = await fetch(`https://www.boredapi.com/api/activity`);
            let data = await getData.json();
            data.selected = true;
            setListOfActivities((originalList) => [...originalList, data]);
            setBoredData(data);
            console.log(listOfActivities);
        } catch(error) {
            console.error(error);
        }
    }

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-col px-5 pt-16 justify-center items-center">
          <div className="w-full md:w-2/3 flex flex-col mb-8 items-center text-center">
            <div className="flex w-full justify-center items-center">
              <button onClick={bored} className="transition ease-in-out delay-150 bg-white border border-2 border-green-600 shadow-lg py-2 px-6 focus:outline-none hover:bg-green-600 hover:text-white hover:-translate-y-1 hover:scale-110 duration-300 rounded text-lg text-green-600">
                Generate Activity
              </button>
            </div>
          </div>
        </div>
            {listOfActivities.map((activityList, index) => {
                return(
                    <div key={index}>
        <div className="container mx-auto flex flex-col px-5 py-2 items-center">
          <div className="w-5/6 md:w-1/3 flex flex-col mb-8 p-6 shadow-lg rounded-md bg-gray-50">
            <div className="flex w-full items-center">
                    <h2 className="md:min-w-96 font-medium text-gray-900 my-2 text-md sm:text-left">
                        {activityList.activity}
                    </h2>
                    
              <button onClick={handleOnClick(activityList)} className="max-w-1/4 bg-indigo-500 border py-1 px-2 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg text-white text-sm">
                Expand
              </button>
            </div>
            <ul className="flex flex-col list-disc justify-items-start items-start text-left my-4 mx-6 sm:mx-8 -mb-1 space-y-2.5" style={{display : activityList.selected===true?'':'none'}}>
                        <li> type : {activityList.type}</li>
                        <li> participants : {activityList.participants}</li>
                        <li> price : {activityList.price}</li>
                        <li> link : {activityList.link}</li>
                        <li> key : {activityList.key}</li>
                        <li> accessibility : {activityList.accessibility}</li>
              </ul>
                    </div>
          </div>
        </div>);
        })}
      </section>
    </div>
  );
}
