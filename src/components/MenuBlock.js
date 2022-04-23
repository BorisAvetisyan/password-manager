function MenuBlock({ title, icon, event }) {
    return(
        <div className="col-lg-4 col-sm-12 menu-block d-table m-3" onClick={event} >
            <div className="h-100 text-center d-table-cell vertical-align-middle">
                { icon }
                <p className="menu-block-title">
                    { title }
                </p>
            </div>
        </div>
    )
}

export default MenuBlock;