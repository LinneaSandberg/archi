import React from 'react';
import { Settings, MapPin, Ruler, Home, Flame, Hammer } from 'lucide-react';
import type { ProjectContext } from '../assets/types';

interface ProjectSidebarProps {
    context: ProjectContext;
    onContextChange: (newContext: ProjectContext) => void;
    onRunCheck: () => void;
    isChecking: boolean;
}

const ProjectSidebar: React.FC<ProjectSidebarProps> = ({
    context,
    onContextChange,
    onRunCheck,
    isChecking
}) => {

    const handleChange = (key: keyof ProjectContext, value: string | number | boolean) => {
        onContextChange({ ...context, [key]: value });
    };

    const inputClass = "w-full rounded-md border-slate-700 border bg-slate-800/50 text-slate-100 p-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all focus:bg-slate-800 placeholder-slate-500";
    const selectClass = "w-full rounded-md border-slate-700 bg-slate-800/50 border p-2 text-sm text-slate-100 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all focus:bg-slate-800";

    return (
        <div className="w-full md:w-80 bg-gradient-to-b from-slate-900/80 to-slate-950/80 backdrop-blur-md border-r border-slate-800 h-full flex flex-col overflow-y-auto shadow-2xl font-sans">
            <div className="p-5 border-b border-slate-800 bg-slate-900/50">
                <h2 className="text-lg font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text flex items-center gap-2">
                    <Settings className="w-5 h-5 text-purple-400" />
                    Projektdata
                </h2>
                <p className="text-xs text-slate-400 mt-1">Parametrar för regelkoll</p>
            </div>

            <div className="p-5 space-y-8 flex-1">

                {/* Project Type & Location */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <MapPin className="w-3 h-3" /> Kontext
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Typ av åtgärd</label>
                            <select
                                className={selectClass}
                                value={context.constructionType}
                                onChange={(e) => handleChange('constructionType', e.target.value)}
                            >
                                <option value="Nybyggnad">Nybyggnad</option>
                                <option value="Tillbyggnad">Tillbyggnad</option>
                                <option value="Ombyggnad">Ombyggnad (Ändring)</option>
                                <option value="Rivning">Rivning</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Byggnadstyp</label>
                            <select
                                className={selectClass}
                                value={context.projectType}
                                onChange={(e) => handleChange('projectType', e.target.value)}
                            >
                                <option value="Enbostadshus">Enbostadshus (Villa)</option>
                                <option value="Flerbostadshus">Flerbostadshus</option>
                                <option value="Kontor">Kontor / Lokal</option>
                                <option value="Skola">Skola / Förskola</option>
                                <option value="Vårdbyggnad">Vårdbyggnad</option>
                                <option value="Industri">Industri</option>
                                <option value="Attefallshus">Attefallshus / Komplement</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Kommun</label>
                            <input
                                type="text"
                                className={inputClass}
                                value={context.municipality}
                                onChange={(e) => handleChange('municipality', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Plangrund</label>
                            <select
                                className={selectClass}
                                value={context.zoning}
                                onChange={(e) => handleChange('zoning', e.target.value)}
                            >
                                <option value="Detaljplanerat område">Inom detaljplan</option>
                                <option value="Utanför plan">Utanför plan</option>
                                <option value="Sammanhållen bebyggelse">Sammanhållen bebyggelse</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* Geometry */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Ruler className="w-3 h-3" /> Geometri & Placering
                    </h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Byggnadshöjd (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={inputClass}
                                value={context.buildingHeight}
                                onChange={(e) => handleChange('buildingHeight', parseFloat(e.target.value))}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Avstånd till tomtgräns (m)</label>
                            <input
                                type="number"
                                step="0.1"
                                className={`${inputClass} ${context.distanceToBoundary < 4.5 ? 'border-yellow-600/50 bg-yellow-950/30 focus:ring-yellow-500' : ''}`}
                                value={context.distanceToBoundary}
                                onChange={(e) => handleChange('distanceToBoundary', parseFloat(e.target.value))}
                            />
                            {context.distanceToBoundary < 4.5 && (
                                <p className="text-[10px] text-yellow-400 mt-1 font-medium">⚠️ Kräver ofta grannemedgivande (PBL 9:30)</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bruttoarea (BTA kvm)</label>
                            <input
                                type="number"
                                className={inputClass}
                                value={context.grossFloorArea}
                                onChange={(e) => handleChange('grossFloorArea', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                </section>

                {/* Technical Requirements */}
                <section className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                        <Hammer className="w-3 h-3" /> Tekniska Egenskaper
                    </h3>

                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1"><Flame className="w-3 h-3" /> Brandklass (BBR 5)</label>
                            <select
                                className={selectClass}
                                value={context.fireClass}
                                onChange={(e) => handleChange('fireClass', e.target.value)}
                            >
                                <option value="Br1">Br1 (Mycket högt skyddsbehov)</option>
                                <option value="Br2">Br2 (Högt skyddsbehov)</option>
                                <option value="Br3">Br3 (Måttligt skyddsbehov)</option>
                                <option value="E0">E0 (Enkelt)</option>
                            </select>
                        </div>
                    </div>

                    <div className="pt-2 space-y-2">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="hasElevator"
                                className="w-4 h-4 text-purple-600 rounded border-slate-700 bg-slate-800 focus:ring-purple-500 cursor-pointer"
                                checked={context.hasElevator}
                                onChange={(e) => handleChange('hasElevator', e.target.checked)}
                            />
                            <label htmlFor="hasElevator" className="text-sm text-slate-300 select-none cursor-pointer">Hiss finns projekterad</label>
                        </div>
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="isAccessible"
                                className="w-4 h-4 text-purple-600 rounded border-slate-700 bg-slate-800 focus:ring-purple-500 cursor-pointer"
                                checked={context.isAccessible}
                                onChange={(e) => handleChange('isAccessible', e.target.checked)}
                            />
                            <label htmlFor="isAccessible" className="text-sm text-slate-300 select-none cursor-pointer flex items-center gap-1">
                                Tillgänglig (BBR 3)
                            </label>
                        </div>
                    </div>
                </section>

            </div>

            <div className="p-5 border-t border-slate-800 bg-slate-900/50">
                <button
                    onClick={onRunCheck}
                    disabled={isChecking}
                    className={`w-full py-3.5 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-bold text-white shadow-lg transition-all
            ${isChecking
                            ? 'bg-slate-700 cursor-not-allowed opacity-50'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 hover:shadow-lg hover:shadow-purple-600/30 active:scale-95'
                        }`}
                >
                    {isChecking ? (
                        <span>Analyserar modell...</span>
                    ) : (
                        <>
                            <Home className="w-4 h-4" />
                            Regelkontroll (PBL/BBR)
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProjectSidebar;
