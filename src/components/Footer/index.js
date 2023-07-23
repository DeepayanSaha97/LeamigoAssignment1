import React from 'react'
import { useState } from 'react'
import { Switch } from 'antd'
import {MdLocationOn} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
import {HiMiniArrowsRightLeft} from 'react-icons/hi2'
import {FaLongArrowAltRight} from 'react-icons/fa'
import {MdGroup} from 'react-icons/md'
import {AiOutlineCaretUp} from 'react-icons/ai'
import {AiOutlineCaretDown} from 'react-icons/ai'


import './index.css'

const apiStatusConstants = {
    initial: 'INITIAL',
    inProgress: 'IN_PROGRESS',
    success: 'SUCCESS',
    failure: 'FAILURE',
  }

const Footer = () => {
    const [tripType,setTripType]=useState(true)
    const [availableVehiclesList,setAvailableVehiclesList]=useState([])
    const [pickupLocation,setPickupLocation]=useState('')
    const [dropOffLocation,setDropOffLocation]=useState('')
    const [startDate,setStartDate] =useState(new Date().toISOString().slice(0,10))
    const [returnDate,setReturnDate]=useState(new Date().toISOString().slice(0,10))
    const [startTime,setStartTime] =useState(new Date().getHours()+":"+new Date().getMinutes())
    const [returnTime,setReturnTime] =useState(startTime)
    const [totalAdults,setTotalAdults]=useState(2)
    const [totalChilds,setTotalChilds] = useState(0)
    const [totalInfants,setTotalInfants] = useState(0)
    const [isDropDownSelected,setDropDownSelectionStatus]=useState(false)
    const [apiStatus,setApiStatus]=useState(apiStatusConstants.failure)

    const onToggleTripType = () => {
        setTripType((oldState)=>!oldState)
    }

    const onEnterPickupLocation = (event) => {
        setPickupLocation(event.target.value)
    }

    const onEnterDropOffLocation = (event) => {
        setDropOffLocation(event.target.value)
    }

    const onRemovePickupLocation = () => {
        setPickupLocation('')
    }

    const onRemoveDropOffLocation = () => {
        setDropOffLocation('')
    }

    const onSetStartDate = (event) => {
        setStartDate(event.target.value)
    }

    const onSetReturnDate = (event) => {
        setReturnDate(event.target.value)
    }

    const onSetStartTime = (event) => {
        setStartTime(event.target.value)
    }

    const onSetReturnTime = (event) => {
        setReturnTime(event.target.value)
    }
   
    const onAddReturn = () => {
        setTripType(false)
    }

    const onToggleDropDownMenuShow = () => {
        setDropDownSelectionStatus((oldState)=>!oldState)
    }

    const onSearchVehicles = async () => {
        setApiStatus(apiStatusConstants.inProgress)
        const getAvailableVehiclesApiUrl="DUMMY DATA" // {I don't have the Api Url...}
        const getAvailableVehiclesApiOptions = {
            method: 'GET',
        }

        const getAvailableVehiclesApiResponse = await fetch(
            getAvailableVehiclesApiUrl,getAvailableVehiclesApiOptions
        )

        if (getAvailableVehiclesApiResponse.ok) {
            const fetchedVehiclesDetails = await getAvailableVehiclesApiResponse.json()
            setApiStatus(apiStatusConstants.success)
            setAvailableVehiclesList(fetchedVehiclesDetails)
        }
        else {
            setApiStatus(apiStatusConstants.failure)
        }
    }

    const renderLoadingView = () => (
        <p>Loader/Spinner can be shown here</p> //Loader/Spinner can be added here to indicate that Api Request is in progress
    )

    const renderApiStatusSuccessView = () => (
        <p>List of Available Vehicles can be shown here</p> //List of Available Vehicles can be shown here based on api response after a successful api request
    )

    const renderApiStatusFailureView = () => (
        <div className="page-failure-view">
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>We could not locate your destinations.</h1>
          <p>Please follow these steps in order to find the best rates for your trip</p>
          <ol className="list-to-follow">
            <li>Find the city where your destination is located</li>
            <li>In the destination field search for the city and select it from the dropdown list.</li>
            <li>Click find a transfer to search for the best rates.</li>
          </ol>
        </div>
      )

      const renderViewBasedOnApiStatus = () => {
    
        switch (apiStatus) {
          case apiStatusConstants.inProgress:
            return renderLoadingView()
          case apiStatusConstants.success:
            return renderApiStatusSuccessView()
          case apiStatusConstants.failure:
            return renderApiStatusFailureView()
          default:
            return null
        }
      }

    let travellersCountTypeText = ''

    const getTravellersCountTypeText = () => {
        if (totalChilds===0 && totalInfants===0) {
            travellersCountTypeText = `${totalAdults} Adults`
        }
        if (totalChilds===0 && totalInfants!==0) {
            travellersCountTypeText = `${totalAdults} Adults, ${totalInfants} I...`
        }
        if (totalChilds!==0 && totalInfants===0) {
            travellersCountTypeText = `${totalAdults} Adults, ${totalChilds} ...`
        }
        if (totalAdults===1) {
            travellersCountTypeText = `${totalAdults} Adult`
        }
      
        return travellersCountTypeText
    }

    return (
        <div className='footer-con'>
            <h1 className='footer-heading'>Are you looking for airport transfers?</h1>
            <p className='footer-para'>You have come to the right place</p>
            <div className='trip-type-selection-con'>
                <h1 className='trip-type'>{tripType?'One-way':'Round-Trip'}</h1>
                <Switch onClick={onToggleTripType} className='switch-btn'/>
            </div>
            <div className='input-fields-search-con'>
                <div className='input-fields-con'>
                    <div className='pickup-el-start-date-time-con'>
                        <div className='pickup-destination-el-con '>
                            <MdLocationOn size="24px" color="#212529"/>
                            <input type='text' value={pickupLocation} onChange={onEnterPickupLocation} className='input-el' placeholder='From: Start typing your pickup location' />
                            {pickupLocation==='Italy' && <RxCross2 size="25px" className="cross-icon" onClick={onRemovePickupLocation}/>} {/* as I don't have the list of available locations I implemented the "Cross Icon" only for "Italy" input */}
                        </div>
                        <div className='date-time-el-con'>
                            <div className='date-picker-el'>
                                <input type='date' className="date-input" value={startDate} onChange={onSetStartDate}/>
            
                            </div>
                            <div className='time-picker-el'>
                                <input type='time' className="time-input" value={startTime} onChange={onSetStartTime}/>
                            </div>
                        </div>
                    </div>
                    {tripType?(<FaLongArrowAltRight size= '30px' className='arrow-icon'/>):(<HiMiniArrowsRightLeft size= '30px' className='arrow-icon'/>)}
                    <div className='pickup-el-start-date-time-con'>
                        <div className='pickup-destination-el-con '>
                            <MdLocationOn size="24px" color="#212529"/>
                            <input type='text' value={dropOffLocation} onChange={onEnterDropOffLocation} className='input-el' placeholder='To: Start typing your dropoff location' />
                            {dropOffLocation==='India' && <RxCross2 size="25px" className="cross-icon" onClick={onRemoveDropOffLocation}/>} {/* as I don't have the list of available locations I implemented the "Cross Icon" only for "India" input */}
                        </div>
                        <div className='date-time-el-con'>
                            <div className='date-picker-el'>
                                {tripType?(<button type='button' className='add-return-btn' onClick={onAddReturn}>+Add Return</button>):(<input type='date' className="date-input" value={returnDate} onChange={onSetReturnDate}/>)}
                        
            
                            </div>
                            <div className='time-picker-el'>
                            {tripType?'':(<input type='time' className="time-input" value={returnTime} onChange={onSetReturnTime}/>)}
                            </div>
                        </div>
                    </div>
                    <div className='traveller-count-type-dropdown-con'>
                        <div className='traveller-count-type-con'>
                            <MdGroup size="17px"/>
                            <p className='traveller-count-type-text'>{getTravellersCountTypeText()}</p>
                        </div>

                        {!isDropDownSelected? (<AiOutlineCaretDown onClick={onToggleDropDownMenuShow} size="10px"/>):(<AiOutlineCaretUp size="10px" onClick={onToggleDropDownMenuShow}/>)}
                    </div>
                </div>
                <button type="button" onClick={onSearchVehicles} className='search-btn'>Search</button>
            </div>

          
        </div>
    )
}

export default Footer