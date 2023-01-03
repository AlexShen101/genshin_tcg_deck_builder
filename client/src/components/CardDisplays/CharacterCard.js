import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const CharacterCardDisplay = (props) => {
    const card = props.card


    const displaySkill = (skill) => {
        return (
            <>
                <table className='table border mb-0 mt-4'>
                    <thead>
                        <tr className="bg-dark-5">
                            <th className="border">Name</th>
                            <th>Cost</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th className="border">{skill.name}</th>
                            <th>{skill.cost}</th>
                        </tr>
                    </tbody>
                </table>
                <div className="border p-2">
                    <p>{skill.desc}</p>
                </div>
            </>
        )
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm-4 col-12">
                    <div className="text-center p-2">
                        <p className="text-uppercase m-0 card-display-card-name">{card.name}</p>
                    </div>
                    <img src={card.highResImageUrl} className="w-100"></img>
                    <p className="card-display-card-description fst-italic">{card.description}</p>

                    <div className="border text-center bg-dark-5">
                        <p className="m-0 fw-bolder color-primary">Info</p>
                    </div>

                    <div className="d-flex justify-content-center">
                        <ul className="list-group rounded-0 w-50">
                            <li className="list-group-item border-right-0 color-primary">Faction</li>
                            <li className="list-group-item border-right-0 color-primary">Element</li>
                            <li className="list-group-item border-right-0 color-primary">Weapon</li>
                        </ul>
                        <ul className="list-group rounded-0 w-50">
                            <li className="card-display-card-faction list-group-item border-left-0 ">{card.faction}</li>
                            <li className="card-display-card-element list-group-item border-left-0">{card.element}</li>
                            <li className="card-display-card-weapon list-group-item border-left-0">{card.weapon}</li>
                        </ul>
                    </div>

                    <div className="border text-center bg-dark-5">
                        <p className="m-0 fw-bolder color-primary">Obtained</p>
                    </div>
                    <div className="border">
                        <p className="mx-2 card-display-card-obtained">{card.obtained}</p>
                    </div>
                </div>

                <div className="col-sm-8 col-12">
                    <h2>Skills</h2>
                    {displaySkill(card.normal)}
                    {displaySkill(card.skill)}
                    {card.skill2 &&
                        <>
                            <h3>Skill</h3>
                            {displaySkill(card.skill2)}
                        </>
                    }
                    {displaySkill(card.burst)}
                    {card.passive &&
                        <>
                            <h3>Passive</h3>
                            {displaySkill(card.passive)}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default CharacterCardDisplay