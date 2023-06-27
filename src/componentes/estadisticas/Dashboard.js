const DashboardCard = ({ title, name, score, date }) => (
    <div className="col-sm-4">
        <h3 className="dashboard-title">{title}</h3>
        <div className="card mt-3">
            <div className="card-resumenEstadisctica card-body">
                {name && <h5 className="card-title">{name}</h5>}
                <p className="card-text">Puntaje: {score}</p>                       
            </div>                       
            {date && (
                <div className='fechaResumen'>
                    <p className="card-text">Fecha: {date}</p>
                </div>
            )}
        </div>
    </div>
);
export default DashboardCard