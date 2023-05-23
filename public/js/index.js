$("#btn-save").click(async() => {
    let form = $("#form").serializeArray()
    const total_passive_emp = num(form[14].value) + num(form[15].value)
    const total_active_imoble = num(form[9].value) + num(form[10].value)
    const total_active_differ = num(form[11].value)
    const total_active_perma = total_active_imoble + total_active_differ

    const total_active_circ = num(form[0].value) + num(form[1].value) +
        num(form[2].value) + num(form[3].value) + num(form[4].value) + num(form[5].value)

    const total_active_long = num(form[6].value) + num(form[7].value) +
        num(form[8].value)

    const total_active = total_active_long + total_active_circ + total_active_perma
    const total_passive = total_passive_emp + num(form[12].value) +
        num(form[13].value) + num(form[16].value)


    const balance_dict = {
        "passivo": {
            "total": total_passive,
            "fornecedores": num(form[12].value),
            "alugueis": num(form[13].value),
            "emprestimos": {
                "total": total_passive_emp,
                "longo_prazo": num(form[14].value),
                "a_pagar": num(form[15].value)
            },

            "impostos": num(form[16].value)
        },
        "ativo": {
            "total": total_active,
            "permanentes": {
                "total": total_active_perma,
                "imobilizado": {
                    "total": total_active_imoble,
                    "veiculos": num(form[9].value),
                    "moveis": num(form[10].value)
                },
                "diferido": {
                    "total": total_active_differ,
                    "gastos_estudos": num(form[11].value)
                }
            },
            "circulante": {
                "total": total_active_circ,
                "emprestimos_a_funcionarios": num(form[0].value),
                "estoque": num(form[1].value),
                "clientes": num(form[2].value),
                "caixa": num(form[3].value),
                "bancos": num(form[4].value),
                "veiculos": num(form[5].value),
            },
            "longo_prazo": {
                "total": total_active_long,
                "adiantamentos": num(form[6].value),
                "clientes": num(form[7].value),
                "emprestimos_a_funcionarios": num(form[8].value),
            }
        },
    }
    let txt = JSON.stringify(balance_dict)
    await $.post("/save-file", { data: txt });
    window.location = "/result";

})
$(function() {
    $('.money').mask("#,##0.00", {
        reverse: true,
    })
})

const num = (param) => {
    if (param === "") return 0
    return parseFloat(param.replace(',', ''))
}