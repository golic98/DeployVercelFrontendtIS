import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

export default function CreateUserForm({ close }) {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { signup } = useAuth();

    const onSubmit = (data) => {
        signup(data);
        window.location.reload();
    };

    return (
        <div className="flex flex-col items-stretch bg-white p-32 rounded-xl shadow-lg w-500 h-full">
            <header className="bg-dark-green p-16 rounded-xl mb-8 text-center shadow-lg">
                <h2 className="m-0 text-center text-[1.5rem] text-white">Creación de Usuario</h2>
            </header>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 shadow-lg rounded-xl w-full my-8 mx-0 p-16 bf-white">
                <div className="flex flex-col gap-4">
                    <label htmlFor="name" className="text-[1rem] font-[600] text-dark-slate">Nombre</label>
                    <input type="text" {...register("name", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese el nombre del usuario"
                    />
                    {
                        errors.name && (<p className="text-red text-[0.8rem]">El nombre es requerido</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="username" className="text-[1rem] font-[600] text-dark-slate">Username</label>
                    <input type="text" {...register("username", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese el usuario nuevo"
                    />
                    {
                        errors.username && (<p className="text-red text-[0.8rem]">El usuario es requerido</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="email" className="text-[1rem] font-[600] text-dark-slate">Email</label>
                    <input type="email" {...register("email", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese su email"
                    />
                    {
                        errors.email && (<p className="text-red text-[0.8rem]">El email es requerido</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="password" className="text-[1rem] font-[600] text-dark-slate">Contraseña</label>
                    <input type="password" {...register("password", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese una contraseña para el usuario"
                    />
                    {
                        errors.password && (<p className="text-red text-[0.8rem]">La contraseña es requerida</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="telephone" className="text-[1rem] font-[600] text-dark-slate">Teléfono</label>
                    <input type="text" {...register("telephone", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese el número de telefono"
                    />
                    {
                        errors.telephone && (<p className="text-red text-[0.8rem]">El teléfono es requerido</p>)
                    }
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="age" className="text-[1rem] font-[600] text-dark-slate">Edad</label>
                    <input
                        type="number"
                        min="0"
                        {...register("age", {
                            required: "La edad es requerida",
                            min: { value: 0, message: "La edad no puede ser negativa" }
                        })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        placeholder="Ingrese la edad"
                    />

                    {
                        errors.age && (<p className="text-red text-[0.8rem]">La edad es requerida</p>)
                    }
                </div>
                <div className="flex flex-col py-4">
                    <select
                        {...register("role", { required: true })}
                        className="p-12 border border-mid-gray rounded-lg font-[1rem]"
                        defaultValue="normal"
                    >
                        <option value="normal">Normal</option>
                        <option value="vigilant">Vigilant</option>
                        <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red text-[0.8rem]">El rol es requerido</p>}
                </div>

                <div className="flex justify-between gap-16">
                    <button
                        type="button"
                        className="bg-custom-gray text-dark-gray py-12 px-16 border-none rounded-md
                        duration-300 ease-in-out cursor-pointer text-[1rem] hover:bg-mid-gray"
                        onClick={() => close()}>
                        Cancelar
                    </button>
                    <button type="submit" className="bg-dark-slate text-white py-12 px-16 border-none
                    duration-300 ease-in-out rounded-md cursor-pointer text-[1rem] hover:bg-custom-slate">
                        Crear cuenta
                    </button>
                </div>
            </form>
        </div>
    );
}