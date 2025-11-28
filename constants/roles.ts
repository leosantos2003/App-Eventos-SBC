export enum Role {
    DIRECTORY_MEMBER = 1,
    COUNCIL_MEMBER = 2,
    EDUCATION_COMMISSION = 3,
    REGIONAL_SECRETARY = 4,
    SPECIAL_COMMISSION_COORDINATOR = 5,
    OTHERS = 6
}

export const RoleLabels: Record<Role, string> = {
    [Role.DIRECTORY_MEMBER]: "Membro da Diretoria",
    [Role.COUNCIL_MEMBER]: "Membro do Conselho",
    [Role.EDUCATION_COMMISSION]: "Comissão de Educação",
    [Role.REGIONAL_SECRETARY]: "Secretário Regional",
    [Role.SPECIAL_COMMISSION_COORDINATOR]: "Coordenador de Comissão Especial",
    [Role.OTHERS]: "Outros"
};