module.exports = {
	"db" : {
		"port" : 8889
	},
	"queries" : {
		"getCampos" : "SELECT A.nombre, A.localidad, A.direccion, A.cultivo, B.nomEmpresa FROM campos AS A INNER JOIN generales_empresa AS B ON A.id_empresa = id_genEmpresa",
		"getSENASICA" : "SELECT * FROM CAT_PREG_DIAG_SENASICA_CAMPO"
	}
}
