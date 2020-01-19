import React from 'React'

const createIdForNominee = (nominee, award) => {
    const nameStr = nominee.name
        .split(' ')
        .join('-')
        .toLowerCase()
    const awardStr = award.title
        .split(' ')
        .join('-')
        .toLowerCase()
    return nameStr + awardStr
}

const Award = ({ award }) => {
    return (
        <section>
            <h3>{award.title}</h3>
            {award.nominees.map(nominee => {
                const id = createIdForNominee(nominee, award)
                return (
                    <div key={id} style={{ display: 'flex', alignItems: 'center' }}>
                        <input type="radio" id={id} />
                        <label htmlFor={id}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <img src={nominee.image} height="100px" />
                                <div>
                                    <h4>{nominee.name}</h4>
                                    <h5>{nominee.description}</h5>
                                </div>
                            </div>
                        </label>
                    </div>
                )
            })}
        </section>
    )
}

export default Award
