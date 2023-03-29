import { ListReceiverQueryType } from "../../routes/receivers"
import { Receiver } from "../../types/receiver"

const receiverData: Array<Receiver> = [{
    "id": "01GWQKF63DZRF72QARJ6NKY5TY",
    "name": "Codi Torvey",
    "cpfCnpj": "893718452",
    "bank": "wadlon",
    "agency": "119-5",
    "account": "01310967-2",
    "status": "RASCUNHO",
    "key_type": "ctorvey0@europa.eu",
    "key_value": 3859
}, {
    "id": "01GWQKF63KX2HHJHX1AV0WN5Z8",
    "name": "Erick Arnold",
    "cpfCnpj": "393721168",
    "bank": "ggydyt",
    "agency": "679-2",
    "account": "14874504-8",
    "status": "RASCUNHO",
    "key_type": "earnold1@geocities.jp",
    "key_value": 215
}, {
    "id": "01GWQKF63S48DEKJAJ4BTVAQDV",
    "name": "Sarina Moughton",
    "cpfCnpj": "445866766",
    "bank": "bqckxq",
    "agency": "092-1",
    "account": "61668765-9",
    "status": "RASCUNHO",
    "key_type": "smoughton2@exblog.jp",
    "key_value": 1417
}, {
    "id": "01GWQKF63Y6B5JD8EA209Y254A",
    "name": "Chelsie Reddin",
    "cpfCnpj": "033845512",
    "bank": "tjlxqe",
    "agency": "004-2",
    "account": "01823409-7",
    "status": "VALIDADO",
    "key_type": "creddin3@wp.com",
    "key_value": 233
}, {
    "id": "01GWQKF6435GJVP134AJNZEWXN",
    "name": "Raleigh Vargas",
    "cpfCnpj": "506392999",
    "bank": "hcvorp",
    "agency": "598-8",
    "account": "92394704-0",
    "status": "VALIDADO",
    "key_type": "rvargas4@unc.edu",
    "key_value": 3079
}, {
    "id": "01GWQKF648WAX3984DW5JET479",
    "name": "Archibaldo Stout",
    "cpfCnpj": "868165730",
    "bank": "uflefy",
    "agency": "306-1",
    "account": "97075568-3",
    "status": "VALIDADO",
    "key_type": "astout5@fotki.com",
    "key_value": 1166
}, {
    "id": "01GWQKF64DEQD4A6GMVCCMRJQY",
    "name": "Jenelle Daveley",
    "cpfCnpj": "607647291",
    "bank": "cmvuzd",
    "agency": "490-4",
    "account": "49464408-2",
    "status": "RASCUNHO",
    "key_type": "jdaveley6@newyorker.com",
    "key_value": 2269
}, {
    "id": "01GWQKF64G6WVSGZW563MPJEJQ",
    "name": "Nellie Timms",
    "cpfCnpj": "046373224",
    "bank": "zfpnep",
    "agency": "186-4",
    "account": "11402041-3",
    "status": "VALIDADO",
    "key_type": "ntimms7@yellowbook.com",
    "key_value": 4763
}, {
    "id": "01GWQKF64K5G9BJ74X6V6QG84E",
    "name": "Benoite Tellenbrok",
    "cpfCnpj": "819935319",
    "bank": "nnhqqg",
    "agency": "493-3",
    "account": "10799386-1",
    "status": "VALIDADO",
    "key_type": "btellenbrok8@macromedia.com",
    "key_value": 4150
}, {
    "id": "01GWQKF64NN9AJ7SY61GES2NJ2",
    "name": "Catlaina Sposito",
    "cpfCnpj": "751581366",
    "bank": "vrbmoj",
    "agency": "309-0",
    "account": "90786318-3",
    "status": "VALIDADO",
    "key_type": "csposito9@github.io",
    "key_value": 416
}, {
    "id": "01GWQKF64Q5TDMR3GBK86NW70V",
    "name": "Ed McCarlich",
    "cpfCnpj": "754953917",
    "bank": "swlmrg",
    "agency": "545-1",
    "account": "99149122-9",
    "status": "VALIDADO",
    "key_type": "emccarlicha@livejournal.com",
    "key_value": 2690
}, {
    "id": "01GWQKF64WVDHSV65RR47YDG1W",
    "name": "Wandis Stallybrass",
    "cpfCnpj": "086757680",
    "bank": "iviqkj",
    "agency": "304-1",
    "account": "06324483-3",
    "status": "RASCUNHO",
    "key_type": "wstallybrassb@senate.gov",
    "key_value": 2609
}, {
    "id": "01GWQKF651CKJRQ30MND7845VW",
    "name": "Tallou Parkey",
    "cpfCnpj": "150376632",
    "bank": "bxqkpq",
    "agency": "542-1",
    "account": "30606843-6",
    "status": "RASCUNHO",
    "key_type": "tparkeyc@google.com",
    "key_value": 3775
}, {
    "id": "01GWQKF656A52AMW6RR58V38SY",
    "name": "Andros Adamson",
    "cpfCnpj": "945650012",
    "bank": "mhofyg",
    "agency": "359-1",
    "account": "54299393-6",
    "status": "RASCUNHO",
    "key_type": "aadamsond@sciencedirect.com",
    "key_value": 2994
}, {
    "id": "01GWQKF659YY89XE3QNH0SXKP9",
    "name": "Tess Pitrollo",
    "cpfCnpj": "082690379",
    "bank": "pgqpnt",
    "agency": "702-3",
    "account": "81995102-7",
    "status": "VALIDADO",
    "key_type": "tpitrolloe@google.co.jp",
    "key_value": 831
}, {
    "id": "01GWQKF65DTANE54KB5R339QE2",
    "name": "Issiah Phlippsen",
    "cpfCnpj": "455862599",
    "bank": "kuawwg",
    "agency": "774-2",
    "account": "40905983-8",
    "status": "VALIDADO",
    "key_type": "iphlippsenf@sohu.com",
    "key_value": 2095
}, {
    "id": "01GWQKF65J4K18X29VFMPG2AM7",
    "name": "Horst Crossby",
    "cpfCnpj": "283465293",
    "bank": "cmsztc",
    "agency": "901-0",
    "account": "99229052-0",
    "status": "VALIDADO",
    "key_type": "hcrossbyg@patch.com",
    "key_value": 3981
}, {
    "id": "01GWQKF65QR4CVTDHAWT9AG97B",
    "name": "Molly Clubley",
    "cpfCnpj": "767237327",
    "bank": "exgqak",
    "agency": "992-2",
    "account": "83709073-8",
    "status": "VALIDADO",
    "key_type": "mclubleyh@chicagotribune.com",
    "key_value": 2456
}, {
    "id": "01GWQKF65WVH25NTR5GVA63VS4",
    "name": "Sander Goodyear",
    "cpfCnpj": "442043931",
    "bank": "dqtkuv",
    "agency": "900-1",
    "account": "70970545-0",
    "status": "VALIDADO",
    "key_type": "sgoodyeari@bluehost.com",
    "key_value": 581
}, {
    "id": "01GWQKF660ENH8SETXEF72SMX4",
    "name": "Garik Conti",
    "cpfCnpj": "595804503",
    "bank": "wtmsgo",
    "agency": "554-5",
    "account": "62892613-9",
    "status": "VALIDADO",
    "key_type": "gcontij@stanford.edu",
    "key_value": 144
}, {
    "id": "01GWQKF665NMA84AZJ86P31BJ4",
    "name": "Rennie Rodenhurst",
    "cpfCnpj": "290576461",
    "bank": "dnquub",
    "agency": "227-4",
    "account": "65971423-0",
    "status": "RASCUNHO",
    "key_type": "rrodenhurstk@cbc.ca",
    "key_value": 4895
}, {
    "id": "01GWQKF669JRG87MWSMDT4H26P",
    "name": "Haslett Jennrich",
    "cpfCnpj": "178526807",
    "bank": "zmxhin",
    "agency": "259-6",
    "account": "19196898-9",
    "status": "VALIDADO",
    "key_type": "hjennrichl@photobucket.com",
    "key_value": 1474
}, {
    "id": "01GWQKF66EW8551NH174J1W99Y",
    "name": "Reinold Kigelman",
    "cpfCnpj": "702676040",
    "bank": "iiknhh",
    "agency": "648-7",
    "account": "70105161-9",
    "status": "RASCUNHO",
    "key_type": "rkigelmanm@buzzfeed.com",
    "key_value": 1713
}, {
    "id": "01GWQKF66K6R8CD8JS54NVNTWP",
    "name": "Sandi Turl",
    "cpfCnpj": "175757654",
    "bank": "jstxal",
    "agency": "159-8",
    "account": "33273737-5",
    "status": "RASCUNHO",
    "key_type": "sturln@booking.com",
    "key_value": 2376
}, {
    "id": "01GWQKF66RQ7SV78BAE5W5E8N9",
    "name": "Dannie Tunkin",
    "cpfCnpj": "232047071",
    "bank": "owtwuk",
    "agency": "401-5",
    "account": "51438742-7",
    "status": "VALIDADO",
    "key_type": "dtunkino@wordpress.com",
    "key_value": 4697
}, {
    "id": "01GWQKF66XYX68AF80JZ0ZW953",
    "name": "Annabel Jados",
    "cpfCnpj": "047501720",
    "bank": "yrhdxs",
    "agency": "309-1",
    "account": "59409530-5",
    "status": "VALIDADO",
    "key_type": "ajadosp@canalblog.com",
    "key_value": 366
}, {
    "id": "01GWQKF671QKJHB2VPJ14BEWZB",
    "name": "Sherye Valiant",
    "cpfCnpj": "048214032",
    "bank": "hpgdho",
    "agency": "892-1",
    "account": "45936291-8",
    "status": "RASCUNHO",
    "key_type": "svaliantq@storify.com",
    "key_value": 2782
}, {
    "id": "01GWQKF6742YQVSV01RFTDDX6T",
    "name": "Bill Sandom",
    "cpfCnpj": "844268987",
    "bank": "wdbalh",
    "agency": "737-6",
    "account": "36830679-2",
    "status": "VALIDADO",
    "key_type": "bsandomr@ustream.tv",
    "key_value": 4692
}, {
    "id": "01GWQKF679BAYX4D8ECX9G3SGR",
    "name": "Lief Linnell",
    "cpfCnpj": "959258772",
    "bank": "frjjoa",
    "agency": "032-5",
    "account": "60528320-5",
    "status": "RASCUNHO",
    "key_type": "llinnells@wired.com",
    "key_value": 3941
}, {
    "id": "01GWQKF67DYP80RHB8855E1AEE",
    "name": "Dacey Bushen",
    "cpfCnpj": "733893042",
    "bank": "azhygo",
    "agency": "181-0",
    "account": "00989543-5",
    "status": "RASCUNHO",
    "key_type": "dbushent@merriam-webster.com",
    "key_value": 1714
}, {
    "id": "01GWQKF67GZX6ZSGW19GD6M11A",
    "name": "Hymie Flintoft",
    "cpfCnpj": "961756147",
    "bank": "spdgyl",
    "agency": "699-0",
    "account": "95674564-2",
    "status": "RASCUNHO",
    "key_type": "hflintoftu@sun.com",
    "key_value": 1455
}, {
    "id": "01GWQKF67KMT0YTTVHRQ295GRA",
    "name": "Rebecka Extil",
    "cpfCnpj": "312848597",
    "bank": "ycooel",
    "agency": "470-1",
    "account": "20610898-7",
    "status": "VALIDADO",
    "key_type": "rextilv@artisteer.com",
    "key_value": 4126
}, {
    "id": "01GWQKF67PRT6RYGMW4P477TC0",
    "name": "Harwell Woolland",
    "cpfCnpj": "230637700",
    "bank": "vmowom",
    "agency": "412-0",
    "account": "04199718-9",
    "status": "VALIDADO",
    "key_type": "hwoollandw@cyberchimps.com",
    "key_value": 263
}, {
    "id": "01GWQKF67RMK5F4BRAFK8N6QJX",
    "name": "Ewen Trundle",
    "cpfCnpj": "772359331",
    "bank": "jqyqlh",
    "agency": "373-9",
    "account": "56326657-2",
    "status": "VALIDADO",
    "key_type": "etrundlex@sohu.com",
    "key_value": 4131
}, {
    "id": "01GWQKF67V4A4KMMDZHB32XTBH",
    "name": "Anallese Lehenmann",
    "cpfCnpj": "404517068",
    "bank": "haemtf",
    "agency": "120-2",
    "account": "82500874-7",
    "status": "RASCUNHO",
    "key_type": "alehenmanny@wikipedia.org",
    "key_value": 4047
}, {
    "id": "01GWQKF67XKTQQWJZTACQTCPHS",
    "name": "Leroy Jay",
    "cpfCnpj": "728885467",
    "bank": "ktpmtr",
    "agency": "993-5",
    "account": "56253761-7",
    "status": "VALIDADO",
    "key_type": "ljayz@shinystat.com",
    "key_value": 4176
}, {
    "id": "01GWQKF68062CVCZ32JNA9E2J2",
    "name": "Benoite Lucas",
    "cpfCnpj": "286961419",
    "bank": "wumcqc",
    "agency": "813-3",
    "account": "05006080-0",
    "status": "VALIDADO",
    "key_type": "dalam10@blogger.com",
    "key_value": 1227
}, {
    "id": "01GWQKF6854JT2RJ5RXVH5S6Q4",
    "name": "Dyanne Gravet",
    "cpfCnpj": "803252533",
    "bank": "odcrvl",
    "agency": "121-4",
    "account": "09493631-0",
    "status": "RASCUNHO",
    "key_type": "dgravet11@aboutads.info",
    "key_value": 2122
}, {
    "id": "01GWQKF68AY3KR4XR227C56Z0Q",
    "name": "Iggie Hearne",
    "cpfCnpj": "522927799",
    "bank": "focrfd",
    "agency": "271-3",
    "account": "80175621-8",
    "status": "RASCUNHO",
    "key_type": "ihearne12@vk.com",
    "key_value": 3072
}, {
    "id": "01GWQKF68E4BDS65HJ83TYAQSZ",
    "name": "Antons Vauls",
    "cpfCnpj": "859893745",
    "bank": "tmyivr",
    "agency": "452-0",
    "account": "37944623-7",
    "status": "RASCUNHO",
    "key_type": "avauls13@1688.com",
    "key_value": 1363
}]

type ListReceiverResponse = {
    total: number,
    data: Array<Receiver>
}

const listReceiver = (filter: ListReceiverQueryType): Promise<ListReceiverResponse> => {
    const res: ListReceiverResponse = {
        total: 0,
        data: []
    }

    const data = receiverData.filter(receiver => (
        receiver.status.includes(filter.status?.valueOf() ?? "") &&
        receiver.name.includes(filter.name ?? "") &&
        receiver.key_type.includes(filter.key_type ?? "") &&
        (!filter.key_value || receiver.key_value === Number(filter.key_value))
    ))
    for (let i = 0; i < data.length && i < filter.itemsPerPage!; i++) {
        res.data.push(data[i])
        res.total += 1
    }

    return Promise.resolve(res)
}
export { listReceiver }