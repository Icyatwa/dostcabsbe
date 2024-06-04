// ride.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useClerk } from '@clerk/clerk-react';
import './ridePost.css';
import axios from "axios";

function Ride() {
    const { user } = useClerk();
    const [rides, setRides] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/taxis/taxi/${user.id}`);
                if (response.status !== 200) {
                    throw new Error('Failed to fetch rides');
                }

                const data = response.data;
                if (data && Array.isArray(data.rides)) {
                    setRides(data.rides);
                } else {
                    console.error('Received data is not in expected format:', data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rides:', error.message);
            }
        };

        if (user) {
            fetchRides();
        }
    }, [user]);

    return (
        <div>
            {loading ? (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <div>Loading...</div>
                </div>
            ) : (
                <div className='ridesContainer'>
                    {rides.length > 0 ? (
                        rides.slice().reverse().map((ride) => {
                            console.log(ride);
                            return (
                                <Link
                                    key={ride._id}
                                    to={{ pathname: `/post/${ride._id}`, state: { fromSearchPage: true, busId: ride._id } }}
                                    className='postButton'
                                >
                                    <div className='post'>
                                        <div className='upper'>
                                            <div className='left'>
                                                <label>{ride.time}</label>
                                            </div>
                                            <div className='right'>
                                                <label>{ride.stations && ride.stations.length > 0 && ride.stations[0]}</label>
                                                <label>to</label>
                                                <label>{ride.stations && ride.stations.length > 1 && ride.stations[1]}</label>
                                            </div>
                                        </div>
                                        <div className='middle'>
                                            <div className='labels'>
                                                <label>{ride.price} RWF</label>
                                                <label>{ride.bus && ride.bus.capacity} Seats</label>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div>No rides available</div>
                    )}
                </div>
            )}
        </div>
    );
}

export default Ride;
if the internet is off the system should say no internet, if the rides are available but still loading then the rides should load, if there are no rides then the system should say no rides available