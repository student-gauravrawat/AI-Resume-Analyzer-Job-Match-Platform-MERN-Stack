import roles from "./skillsByRole.json" with {type: "json"}

export function getRoleSkills(role){
    return roles[role]?.skills || []
}


