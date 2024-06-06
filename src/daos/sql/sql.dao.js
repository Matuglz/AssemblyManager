import { sqlConfig } from "../../config/db.sql.config.js"
import sql from 'mssql'
import { laptopVaioI5Service } from "../../service/laptops/vaio.i5.service.js";



class sql_db_dao {
    async addLicences(licences, userEmail, typeLicence) {

        const pool = await sql.connect(sqlConfig)

        licences.forEach(async (lic) => {
            await pool.request()
                .input('EMAIL', sql.Text, userEmail)
                .input('LICENCE', sql.NVarChar, lic)
                .query(`
                INSERT INTO ${typeLicence}Licences ( LICENCE, IS_USED, ID_USED_LAPTOP, USER_UPLOAD)
                VALUES (@LICENCE, 0, NULL, @EMAIL)
        `)

        })

        let db = await sql.query(`SELECT * FROM dbo.${typeLicence}Licences`)
        console.log(db.recordset);

        await sql.close()
    }

    async useLicence(laptopCode, userEmail, typeLicence) {
        //UPDATE LICENCE IN SQL
        try {
            await laptopVaioI5Service.checkLicencesStatus(laptopCode, typeLicence)
            const pool = await sql.connect(sqlConfig)
            let request = await pool.request()
                .query(`
                                    SELECT TOP 1 *
                                    FROM ${typeLicence}Licences
                                    WHERE IS_USED = 0`)

            if (request.recordset.length < 1) {
                throw new Error(`dont have more ${typeLicence} licences`)
            }

            let licence = request.recordset[0]
            

            if (!laptopCode || !userEmail) {
                throw new Error(`user email or laptop code aren't validates`)
            }

            let update = await pool.request()
                .input('LAPTOP_CODE', sql.NVarChar, laptopCode)
                .input('LICENCE', sql.NVarChar, licence.LICENCE)
                .input('USER', sql.Text, userEmail)
                .query(`
                                UPDATE ${typeLicence}Licences
                                SET IS_USED = 1,
                                    ID_USED_LAPTOP = @LAPTOP_CODE,
                                    USER_USE_LICENCE = @USER,
                                    DATE_USER_USED_LICENCE = GETDATE()
                                WHERE LICENCE = @LICENCE
                            `)

            let licenceUpdated = await pool.request()
                .input('LICENCE', sql.NVarChar, licence.LICENCE)
                .query(`
                                        SELECT * FROM ${typeLicence}Licences
                                        WHERE LICENCE = @LICENCE
                                    `)

            await sql.close()

            return licenceUpdated.recordset[0]
        }catch(error){
            throw new Error('fail to consume licence. error: ' + error.message)
        }
    }
}

export async function get_SQL_Functions_DAO() {
    let SQL_Functions_DAO
    return SQL_Functions_DAO = new sql_db_dao
}